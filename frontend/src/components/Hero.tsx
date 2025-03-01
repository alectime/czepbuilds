import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <h1>Welcome to Czep Builds</h1>
          <h2>Creating Innovative Digital Solutions</h2>
          <p>
            Software engineering and web development services focused on
            delivering high-quality, scalable, and user-friendly applications.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View Portfolio</a>
            <a href="#contact" className="btn btn-secondary">Get in Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 