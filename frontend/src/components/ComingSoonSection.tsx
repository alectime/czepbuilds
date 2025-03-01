import '../styles/ComingSoonSection.css';

const ComingSoonSection = () => {
  return (
    <section className="coming-soon-section">
      <div className="container">
        <div className="coming-soon-content">
          <h2>Coming Soon: VPD Calculator</h2>
          <div className="divider"></div>
          <p>
            A powerful tool designed to help growers calculate and monitor Vapor Pressure Deficit
            for optimal plant growth conditions. Stay tuned for the release!
          </p>
          <div className="features">
            <div className="feature">
              <div className="feature-icon">📊</div>
              <h3>Real-time Calculations</h3>
              <p>Instant VPD values based on temperature and humidity inputs.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Use the calculator on any device, anywhere in your grow space.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📈</div>
              <h3>Growth Stage Presets</h3>
              <p>Optimized settings for different stages of plant development.</p>
            </div>
          </div>
          <div className="subscribe">
            <p>Get notified when we launch:</p>
            <div className="subscribe-form">
              <input type="email" placeholder="Enter your email" />
              <button>Notify Me</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection; 