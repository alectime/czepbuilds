import '../styles/ProjectCard.css';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
}

const ProjectCard = ({
  title,
  description,
  imageUrl,
  technologies,
  projectUrl,
  githubUrl
}: ProjectCardProps) => {
  // Determine if the project URL is internal or external
  const isInternalLink = projectUrl && projectUrl.startsWith('/');

  return (
    <div className="project-card">
      <div className="project-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="project-tech">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
        <div className="project-links">
          {projectUrl && (
            isInternalLink ? (
              <Link to={projectUrl} className="project-link">
                View Project
              </Link>
            ) : (
              <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                View Project
              </a>
            )
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="github-link">
              GitHub Repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 