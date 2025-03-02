import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// Rate limiting function that tracks IP addresses
export const trackSubscriptionAttempts = functions.firestore
  .document('subscriptions/{subscriptionId}')
  .onCreate(async (snapshot, context) => {
    try {
      const subscription = snapshot.data();
      const ip = subscription.ipAddress || 'unknown';
      
      // Don't track if IP is unknown or server-side placeholder
      if (ip === 'unknown' || ip === 'collected-server-side') {
        return null;
      }
      
      // Get or create rate limit document
      const rateLimitRef = db.collection('rateLimits').doc(ip);
      const rateLimitDoc = await rateLimitRef.get();
      
      if (!rateLimitDoc.exists) {
        // Create new rate limit tracking
        await rateLimitRef.set({
          ip: ip,
          counts: {
            subscriptions: 1
          },
          firstAttempt: admin.firestore.FieldValue.serverTimestamp(),
          lastAttempt: admin.firestore.FieldValue.serverTimestamp()
        });
      } else {
        // Update existing rate limit tracking
        const data = rateLimitDoc.data();
        const subscriptionCount = (data?.counts?.subscriptions || 0) + 1;
        
        await rateLimitRef.update({
          'counts.subscriptions': subscriptionCount,
          lastAttempt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        // If too many attempts, flag the subscription
        if (subscriptionCount > 10) {
          await snapshot.ref.update({
            flagged: true,
            flagReason: 'Rate limit exceeded'
          });
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error tracking subscription attempts:', error);
      return null;
    }
  });

// Sanitize subscription data to remove any potentially harmful content
export const sanitizeSubscriptionData = functions.firestore
  .document('subscriptions/{subscriptionId}')
  .onCreate(async (snapshot, context) => {
    try {
      const subscription = snapshot.data();
      const email = subscription.email || '';
      
      // Basic email validation regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      // Check if email is valid
      if (!emailRegex.test(email)) {
        await snapshot.ref.update({
          flagged: true,
          flagReason: 'Invalid email format'
        });
        return null;
      }
      
      // Check for suspicious content in user agent
      const userAgent = subscription.userAgent || '';
      if (userAgent.includes('<script>') || userAgent.includes('javascript:') || 
          userAgent.length > 500) {
        await snapshot.ref.update({
          flagged: true,
          flagReason: 'Suspicious user agent',
          userAgent: 'REDACTED'
        });
      }
      
      return null;
    } catch (error) {
      console.error('Error sanitizing subscription data:', error);
      return null;
    }
  });

// Scheduled function to clean up old rate limiting data (runs daily)
export const cleanupRateLimits = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    try {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      const rateLimitsRef = db.collection('rateLimits');
      const oldLimits = await rateLimitsRef
        .where('lastAttempt', '<', oneDayAgo)
        .get();
      
      const batch = db.batch();
      oldLimits.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      if (oldLimits.size > 0) {
        await batch.commit();
        console.log(`Cleaned up ${oldLimits.size} old rate limit records`);
      }
      
      return null;
    } catch (error) {
      console.error('Error cleaning up rate limits:', error);
      return null;
    }
  });

// Log all subscription attempts for security auditing
export const logSubscriptionActivity = functions.firestore
  .document('subscriptions/{subscriptionId}')
  .onCreate(async (snapshot, context) => {
    try {
      const subscription = snapshot.data();
      const subscriptionId = context.params.subscriptionId;
      
      // Create an activity log entry
      await db.collection('activityLogs').add({
        action: 'subscription_created',
        resourceId: subscriptionId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        userAgent: subscription.userAgent || 'unknown',
        ipAddress: subscription.ipAddress || 'unknown',
        // Don't log the actual email for privacy
        emailDomain: subscription.email ? subscription.email.split('@')[1] : 'unknown'
      });
      
      return null;
    } catch (error) {
      console.error('Error logging subscription activity:', error);
      return null;
    }
  }); 