import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-copyright">
            <p>© {currentYear} Czep Builds. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <ul>
              <li><a href="https://github.com/czepbuilds" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/alec-czepiel" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="mailto:contact@czepbuilds.com">Email</a></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 