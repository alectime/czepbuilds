import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ParallaxTileProps {
  title: string;
  description: string;
  category: string;
  image: string;
  projectLink?: string;
  repoLink?: string;
  className?: string;
}

const ParallaxTile: React.FC<ParallaxTileProps> = ({
  title,
  description,
  category,
  image,
  projectLink,
  repoLink,
  className,
}) => {
  const tileRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tileRef.current) return;
    
    const rect = tileRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
    setGlarePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setIsHovering(false);
  };

  return (
    <div
      ref={tileRef}
      className={`project-tile parallax-container relative group ${className || ''}`}
      style={{ 
        transform: transform,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: isHovering ? '2px solid #fd801d' : '2px solid transparent',
        boxShadow: isHovering ? '0 0 25px rgba(253, 128, 29, 0.6)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Enhanced Orange Border Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '-4px',
          left: '-4px',
          right: '-4px',
          bottom: '-4px',
          backgroundColor: '#fd801d',
          zIndex: -1,
          borderRadius: '0.5rem',
          transition: 'all 0.3s',
          boxShadow: isHovering ? '0 0 30px 8px rgba(253, 128, 29, 0.7)' : 'none',
          opacity: isHovering ? 1 : 0,
          filter: 'blur(8px)',
        }}
      />
      
      {/* Background Image */}
      <div
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          opacity: isHovering ? 1 : 0.95,
          transition: 'opacity 0.5s, transform 0.5s',
          transform: isHovering ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      
      {/* Gradient overlay for better text readability */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3))',
          opacity: isHovering ? 0.9 : 0.8,
          transition: 'opacity 0.3s',
        }}
      />
      
      {/* Glare effect */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.8) 0%, transparent 50%)`,
          opacity: isHovering ? 0.3 : 0,
          transition: 'opacity 0.7s',
          pointerEvents: 'none',
        }}
      />
      
      <div className="project-content" style={{ 
        position: 'relative', 
        zIndex: 1, 
        padding: '2rem', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        justifyContent: 'space-between',
        flex: '1 1 auto'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.25rem 0.625rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 500,
              backgroundColor: 'rgba(253, 128, 29, 0.8)',
              color: '#ffffff',
              opacity: isHovering ? 1 : 0,
              transition: 'opacity 0.8s',
              animationDelay: '0.1s',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            {category}
          </span>
          <h3 
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'white',
              marginTop: '0.75rem',
              transform: isHovering ? 'translateY(0)' : 'translateY(8px)',
              transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {title}
          </h3>
          <p 
            style={{ 
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.9)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              transform: isHovering ? 'translateY(0)' : 'translateY(8px)',
              transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
              transitionDelay: '50ms',
              marginTop: '0.75rem',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            {description}
          </p>
        </div>
        
        <div 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '2rem',
            transform: isHovering ? 'translateY(0)' : 'translateY(16px)',
            transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
            transitionDelay: '100ms',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {projectLink && (
              <a 
                href={projectLink} 
                aria-label="View Project"
                style={{
                  padding: '0.75rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(253, 128, 29, 0.8)',
                  backdropFilter: 'blur(4px)',
                  color: 'white',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ExternalLink size={20} />
              </a>
            )}
            {repoLink && (
              <a 
                href={repoLink} 
                aria-label="View Repository"
                style={{
                  padding: '0.75rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(4px)',
                  color: 'white',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Github size={20} />
              </a>
            )}
          </div>
          <span 
            style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.8)',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            View Project
          </span>
        </div>
      </div>
    </div>
  );
};

export default ParallaxTile;
