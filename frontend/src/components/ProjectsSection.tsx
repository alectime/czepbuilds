import ProjectCard from './ProjectCard';
import '../styles/ProjectsSection.css';

const ProjectsSection = () => {
  // Sample project data - this would typically come from a CMS or API
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform built with React, Node.js, and MongoDB with full payment processing capabilities.',
      imageUrl: 'https://via.placeholder.com/600x400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      projectUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Workout Tracker App',
      description: 'Mobile-first web application for tracking workouts, setting goals, and monitoring progress over time.',
      imageUrl: 'https://via.placeholder.com/600x400',
      technologies: ['TypeScript', 'React', 'Firebase', 'Chart.js'],
      projectUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Smart Home Dashboard',
      description: 'An IoT dashboard for controlling and monitoring smart home devices with real-time data visualization.',
      imageUrl: 'https://via.placeholder.com/600x400',
      technologies: ['React', 'WebSockets', 'Node.js', 'IoT'],
      projectUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <h2>Projects</h2>
          <div className="divider"></div>
          <p>A showcase of my recent work and personal projects</p>
        </div>
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