import { useEffect } from 'react';
import '../styles/About.css';

const About = () => {
  useEffect(() => {
    // Reveal animations on scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f7f7f2)', transition: 'background-color 0.3s ease' }}>
      <main style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
        {/* About Section */}
        <section style={{ 
          padding: '3rem 1rem', 
          margin: '0 auto',
          maxWidth: '1200px',
          backgroundColor: 'var(--bg-color-secondary, rgba(18, 53, 36, 0.1))',
          borderRadius: '12px',
          boxShadow: 'var(--box-shadow, 0 4px 6px rgba(8, 8, 6, 0.1))',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
        }}>
          <div className="opacity-0 reveal" style={{ maxWidth: '768px', margin: '0 auto' }}>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: 500, 
              marginBottom: '1.5rem', 
              color: 'var(--text-color, #080806)',
              transition: 'color 0.3s ease'
            }}>
              About Me
            </h1>
            <p style={{ 
              color: 'var(--text-muted, #333333)', 
              lineHeight: 1.7, 
              marginBottom: '1rem',
              transition: 'color 0.3s ease'
            }}>
              I'm Alec Czepiel, a full stack developer and systems innovator passionate about integrating digital technologies with real world agricultural and environmental solutions. With a background in environmental science and hands on expertise in controlled environment agriculture, I focus on developing applications and hardware systems that enhance sustainability, automate cultivation, and empower growers.
            </p>
            <p style={{ 
              color: 'var(--text-muted, #333333)', 
              lineHeight: 1.7, 
              marginBottom: '1rem',
              transition: 'color 0.3s ease'
            }}>
              My recent projects include creating open-source IoT tools for soil moisture monitoring, designing automated growing systems for urban agriculture, and developing user friendly web platforms to manage and optimize crop production. My goal is to bridge the gap between online technologies and tangible, impactful solutions in agriculture and sustainability.
            </p>
            <div style={{
              marginTop: '2.5rem',
              padding: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s ease'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 500, 
                marginBottom: '1rem',
                color: 'var(--text-color, #080806)',
                transition: 'color 0.3s ease'
              }}>
                Core Skills & Interests:
              </h3>
              <ul style={{ 
                color: 'var(--text-muted, #333333)', 
                lineHeight: 1.7, 
                marginBottom: '1rem', 
                paddingLeft: '1.5rem',
                listStyle: 'disc',
                transition: 'color 0.3s ease'
              }}>
                <li>Full-Stack Web Development: Building intuitive, interactive digital interfaces that support real world applications.</li>
                <li>Controlled Environment Agriculture: Designing automated systems for optimized growth conditions in greenhouses and indoor farms.</li>
                <li>IoT & Hardware Integration: Developing affordable, accessible sensor systems to enhance monitoring and automation in agriculture.</li>
              </ul>
            </div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 500, 
              marginTop: '2rem', 
              marginBottom: '1rem',
              color: 'var(--text-color, #080806)',
              transition: 'color 0.3s ease'
            }}>
              Let's Collaborate:
            </h3>
            <p style={{ 
              color: 'var(--text-muted, #333333)', 
              lineHeight: 1.7,
              transition: 'color 0.3s ease'
            }}>
              Have an idea or project related to sustainability, agriculture, or technology integration? Let's connect and explore how we can build innovative solutions together.
            </p>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem',
              alignItems: 'center',
              marginTop: '2rem'
            }}>
              <a 
                href="mailto:contact@czepbuilds.com" 
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#123524',
                  color: '#f7f7f2',
                  borderRadius: '0.375rem',
                  transition: 'background-color 0.3s, color 0.3s',
                  textDecoration: 'none',
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: '300px',
                }}
              >
                Email Us
              </a>
              <a 
                href="https://www.linkedin.com/in/alec-czepiel" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-color, #123524)',
                  border: '1px solid #123524',
                  borderRadius: '0.375rem',
                  transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
                  textDecoration: 'none',
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: '300px',
                }}
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About; 