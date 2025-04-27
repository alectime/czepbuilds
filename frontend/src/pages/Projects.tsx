import { useEffect } from 'react';
import '../styles/ParallaxHomePage.css';
import ParallaxTile from '../parallax-design/ParallaxTile';

const Projects = () => {
  // Same projects data as ParallaxHomePage
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
        {/* Page Title */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', marginBottom: '4rem' }}>
          <div style={{ maxWidth: '768px', margin: '0 auto', textAlign: 'center' }}>
            <h1 
              className="animate-fade-in" 
              style={{ 
                fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                fontWeight: 300, 
                letterSpacing: '-0.025em',
                marginTop: '1rem',
                opacity: 0,
                animationDelay: '0.3s',
                animationFillMode: 'forwards',
                color: 'var(--text-color, #080806)',
                transition: 'color 0.3s ease'
              }}
            >
              Projects
            </h1>
            <p 
              className="animate-fade-in" 
              style={{ 
                fontSize: '1.125rem', 
                color: 'var(--text-muted, #333333)', 
                marginTop: '1.5rem',
                opacity: 0,
                animationDelay: '0.5s',
                animationFillMode: 'forwards',
                transition: 'color 0.3s ease'
              }}
            >
              Explore my work across web development, sustainability, and agricultural technology.
            </p>
          </div>
        </section>
        
        {/* Projects Grid */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', marginBottom: '6rem' }}>
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
      </main>
    </div>
  );
};

export default Projects; 