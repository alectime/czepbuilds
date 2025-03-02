import { useState, useEffect, FormEvent } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { v4 as uuidv4 } from 'uuid';
import '../styles/SecureSubscribeForm.css';

// Regular expression for email validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SecureSubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | 'idle';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });

  // Generate CSRF token on component mount
  useEffect(() => {
    setCsrfToken(uuidv4());
  }, []);

  const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
  };

  const sanitizeInput = (input: string): string => {
    // Basic sanitization to prevent XSS
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setFormStatus({ type: 'idle', message: '' });
    
    // Validate email
    const sanitizedEmail = sanitizeInput(email.trim());
    if (!validateEmail(sanitizedEmail)) {
      setFormStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add rate limiting check
      const sessionAttempts = sessionStorage.getItem('formSubmitAttempts') || '0';
      const attempts = parseInt(sessionAttempts, 10);
      
      if (attempts > 5) {
        setFormStatus({
          type: 'error',
          message: 'Too many submission attempts. Please try again later.',
        });
        setIsSubmitting(false);
        return;
      }
      
      // Generate a unique ID for the subscription
      const subscriptionId = uuidv4();
      
      // Add to Firestore with security measures
      await setDoc(doc(db, 'subscriptions', subscriptionId), {
        email: sanitizedEmail,
        timestamp: serverTimestamp(),
        csrfToken,
        userAgent: window.navigator.userAgent,
        consentGiven: true,
        ipAddress: 'collected-server-side' // For GDPR compliance, collect IP on server-side only if needed
      });
      
      // Update attempts count for rate limiting
      sessionStorage.setItem('formSubmitAttempts', (attempts + 1).toString());
      
      // Successful submission
      setFormStatus({
        type: 'success',
        message: 'Thank you! You have been subscribed successfully.',
      });
      setEmail('');
      
      // Generate new CSRF token for next submission
      setCsrfToken(uuidv4());
      
    } catch (error) {
      console.error('Error saving subscription:', error);
      setFormStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="secure-subscribe-form">
      <form onSubmit={handleSubmit}>
        {/* Hidden CSRF token */}
        <input type="hidden" name="csrfToken" value={csrfToken} />
        
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Email address"
            required
            disabled={isSubmitting}
            className={formStatus.type === 'error' ? 'input-error' : ''}
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Notify Me'}
          </button>
        </div>
        
        {formStatus.message && (
          <div className={`form-message ${formStatus.type}`}>
            {formStatus.message}
          </div>
        )}
        
        <div className="privacy-notice">
          <small>
            By subscribing, you agree to our{' '}
            <a href="/privacy-policy">Privacy Policy</a>. We respect your privacy
            and will never share your information.
          </small>
        </div>
      </form>
    </div>
  );
};

export default SecureSubscribeForm; 