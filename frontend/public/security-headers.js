/**
 * Security headers for Firebase hosting configuration
 * To be referenced in firebase.json 
 */

module.exports = {
  // Content Security Policy
  "Content-Security-Policy": 
    "default-src 'self'; " +
    "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https://www.google-analytics.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com; " +
    "frame-src 'self'; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'none'; " +
    "upgrade-insecure-requests;",
    
  // Prevent browsers from incorrectly detecting non-scripts as scripts
  "X-Content-Type-Options": "nosniff",
  
  // Strict HTTPS enforcement
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  
  // Don't allow the site to be framed
  "X-Frame-Options": "DENY",
  
  // Disable browser features that can be abused for tracking
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  
  // Prevent XSS attacks
  "X-XSS-Protection": "1; mode=block",
  
  // Enable cross-origin isolation
  "Cross-Origin-Embedder-Policy": "require-corp",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  
  // Enhance referrer privacy
  "Referrer-Policy": "strict-origin-when-cross-origin"
}; 