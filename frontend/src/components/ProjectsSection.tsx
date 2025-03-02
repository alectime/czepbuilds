import ProjectCard from './ProjectCard';
import '../styles/ProjectsSection.css';

const ProjectsSection = () => {
  // Real projects data
  const projects = [
    {
      id: 1,
      title: 'Spore Link',
      description: 'A comprehensive platform connecting mycology enthusiasts with cultivation resources, strain databases, and community knowledge sharing.',
      imageUrl: 'https://placehold.co/600x400/123524/f7f7f2?text=Spore+Link',
      technologies: ['React', 'Firebase', 'Node.js', 'MongoDB'],
      projectUrl: '/projects/spore-link',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Controlled Environmental Agriculture Builds',
      description: 'Custom-designed growing environments for precision agriculture, featuring automated climate control systems and modular construction.',
      imageUrl: 'https://placehold.co/600x400/123524/f7f7f2?text=CEA+Builds',
      technologies: ['IoT', 'Automation', 'CAD', 'Sustainable Design'],
      projectUrl: '/projects/cea-builds',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'VPD Calculator',
      description: 'An interactive tool for calculating Vapor Pressure Deficit, essential for optimizing growing conditions in controlled environments.',
      imageUrl: 'https://placehold.co/600x400/123524/f7f7f2?text=VPD+Calculator',
      technologies: ['TypeScript', 'React', 'D3.js', 'Progressive Web App'],
      projectUrl: '/projects/vpd-calculator',
      githubUrl: '#'
    }
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <h2>Projects</h2>
        <div className="divider"></div>
        <p>A showcase of my current work and ongoing projects</p>
      </div>
      <div className="container">
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              technologies={project.technologies}
              projectUrl={project.projectUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 