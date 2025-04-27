import { useEffect } from 'react';
import '../styles/ParallaxHomePage.css';

// Import the ParallaxTile component
import ParallaxTile from '../parallax-design/ParallaxTile';

const ParallaxHomePage = () => {
  // Updated projects data with real image URLs
  const projects = [
    {
      id: 1,
      title: 'Spore Link',
      description: 'A comprehensive platform connecting mycology enthusiasts with cultivation resources, strain databases, and community knowledge sharing.',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1516044734145-07ca8eef8731?q=80&w=1000&auto=format&fit=crop',
      projectLink: '/projects/spore-link',
      repoLink: '#'
    },
    {
      id: 2,
      title: 'Controlled Environmental Agriculture Builds',
      description: 'Custom-designed growing environments for precision agriculture, featuring automated climate control systems and modular construction.',
      category: 'IoT & Design',
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1000&auto=format&fit=crop',
      projectLink: '/projects/cea-builds',
      repoLink: '#'
    },
    {
      id: 3,
      title: 'VPD Calculator',
      description: 'An interactive tool for calculating Vapor Pressure Deficit, essential for optimizing growing conditions in controlled environments.',
      category: 'Web App',
      image: 'https://images.unsplash.com/photo-1580982327559-c1202864eb05?q=80&w=1000&auto=format&fit=crop',
      projectLink: '/projects/vpd-calculator',
      repoLink: 'https://github.com/alectime/czepbuilds'
    },
    {
      id: 4,
      title: 'Agricultural Energy Optimization Platform',
      description: 'Advanced SaaS platform for predicting and optimizing energy consumption in controlled agricultural environments through data analysis and machine learning.',
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop',
      projectLink: '/projects/hoya-designs',
      repoLink: 'https://github.com/alectime/hoyadesigns'
    }
  ];

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
        {/* Hero Section */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', marginBottom: '6rem' }}>
          <div style={{ maxWidth: '768px', margin: '0 auto', textAlign: 'center' }}>
            <span 
              className="animate-fade-in" 
              style={{ 
                display: 'inline-block', 
                fontSize: '0.875rem', 
                fontWeight: 500, 
                color: 'var(--text-color, #123524)', 
                letterSpacing: '0.05em', 
                textTransform: 'uppercase',
                opacity: 0,
                animationDelay: '0.3s',
                animationFillMode: 'forwards',
                transition: 'color 0.3s ease'
              }}
            >
              Welcome to Czep Builds
            </span>
            <h1 
              className="animate-fade-in" 
              style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                fontWeight: 300, 
                letterSpacing: '-0.025em',
                marginTop: '1rem',
                opacity: 0,
                animationDelay: '0.5s',
                animationFillMode: 'forwards',
                color: 'var(--text-color, #080806)',
                transition: 'color 0.3s ease'
              }}
            >
              Engineering Sustainable Futures with Digital and Physical Solutions
            </h1>
            <p 
              className="animate-fade-in" 
              style={{ 
                fontSize: '1.125rem', 
                color: 'var(--text-muted, #333333)', 
                marginTop: '1.5rem',
                opacity: 0,
                animationDelay: '0.7s',
                animationFillMode: 'forwards',
                transition: 'color 0.3s ease'
              }}
            >
              Bridging web development, controlled environment agriculture, and IoT technologies to create smarter, greener, and more efficient systems.
            </p>
            <div 
              className="animate-fade-in" 
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '1rem', 
                marginTop: '2rem',
                opacity: 0,
                animationDelay: '0.9s',
                animationFillMode: 'forwards'
              }}
            >
              <a 
                href="#projects" 
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#123524',
                  color: '#f7f7f2',
                  borderRadius: '0.375rem',
                  transition: 'background-color 0.3s, color 0.3s',
                  textDecoration: 'none',
                }}
              >
                View Portfolio
              </a>
              <a 
                href="#about" 
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-color, #123524)',
                  border: '1px solid #123524',
                  borderRadius: '0.375rem',
                  transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
                  textDecoration: 'none',
                }}
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
        
        {/* Projects Grid */}
        <section id="projects" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', marginBottom: '6rem' }}>
          <h2 
            className="opacity-0 reveal" 
            style={{ 
              fontSize: '1.5rem', 
              fontWeight: 500, 
              marginBottom: '3rem',
              color: 'var(--text-color, #080806)',
              transition: 'color 0.3s ease'
            }}
          >
            Projects
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '2rem',
            justifyContent: 'center'
          }}>
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="opacity-0 reveal" 
                style={{ 
                  animationDelay: `${0.1 * index}s`,
                  height: '500px',
                  aspectRatio: '1/1.2',
                  margin: '0 auto',
                  width: '100%',
                  maxWidth: '450px'
                }}
              >
                <ParallaxTile
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  image={project.image}
                  projectLink={project.projectLink}
                  repoLink={project.repoLink}
                  className="aspect-[4/5]"
                />
              </div>
            ))}
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div className="opacity-0 reveal" style={{ maxWidth: '768px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 500, 
              marginBottom: '1.5rem', 
              color: 'var(--text-color, #080806)',
              transition: 'color 0.3s ease'
            }}>
              About Me
            </h2>
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
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 500, 
              marginTop: '2rem', 
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

export default ParallaxHomePage; 