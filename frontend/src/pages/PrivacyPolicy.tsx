import React from 'react';
import '../styles/PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy">
        <h1>Privacy Policy</h1>
        <p className="effective-date">Effective Date: July 1, 2023</p>
        
        <section>
          <h2>Introduction</h2>
          <p>
            At czepbuilds.com ("we", "our", or "us"), we respect your privacy and are committed to protecting your personal data.
            This privacy policy will inform you about how we handle your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>
        
        <section>
          <h2>Data We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul>
            <li><strong>Contact Data</strong>: Email address (when you subscribe to notifications).</li>
            <li><strong>Technical Data</strong>: Internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data</strong>: Information about how you use our website.</li>
          </ul>
        </section>
        
        <section>
          <h2>How We Use Your Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul>
            <li>To notify you about updates to our services.</li>
            <li>To improve our website and services.</li>
            <li>To respond to your requests or inquiries.</li>
            <li>To comply with a legal obligation.</li>
          </ul>
        </section>
        
        <section>
          <h2>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information.
            Cookies are files with a small amount of data which may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
            if you do not accept cookies, you may not be able to use some portions of our website.
          </p>
        </section>
        
        <section>
          <h2>Data Security</h2>
          <p>
            We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, 
            or accessed in an unauthorized way. In addition, we limit access to your personal data to those employees, agents, 
            contractors, and other third parties who have a business need to know.
          </p>
        </section>
        
        <section>
          <h2>Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
          <ul>
            <li><strong>Request access</strong> to your personal data.</li>
            <li><strong>Request correction</strong> of your personal data.</li>
            <li><strong>Request erasure</strong> of your personal data.</li>
            <li><strong>Object to processing</strong> of your personal data.</li>
            <li><strong>Request restriction of processing</strong> your personal data.</li>
            <li><strong>Request transfer</strong> of your personal data.</li>
            <li><strong>Right to withdraw consent</strong>.</li>
          </ul>
          <p>
            If you wish to exercise any of these rights, please contact us at privacy@czepbuilds.com.
          </p>
        </section>
        
        <section>
          <h2>Data Retention</h2>
          <p>
            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for,
            including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>
        </section>
        
        <section>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
          </p>
        </section>
        
        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@czepbuilds.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 