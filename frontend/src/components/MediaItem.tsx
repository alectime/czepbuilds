import React from 'react';
import '../styles/MediaItem.css';

export type MediaType = 'image' | 'video' | 'gif';

export interface MediaItemProps {
  src: string;
  alt: string;
  type: MediaType;
  caption?: string;
  thumbnail?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  onClick?: () => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
  src,
  alt,
  type,
  caption,
  thumbnail,
  width,
  height,
  className = '',
  onClick
}) => {
  const renderMedia = () => {
    switch (type) {
      case 'image':
        return (
          <img 
            src={src} 
            alt={alt} 
            width={width} 
            height={height} 
            className="media-content"
            loading="lazy"
          />
        );
      case 'video':
        return (
          <video 
            src={src} 
            controls 
            width={width} 
            height={height}
            className="media-content"
            poster={thumbnail}
            preload="metadata"
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case 'gif':
        return (
          <img 
            src={src} 
            alt={alt} 
            width={width} 
            height={height} 
            className="media-content"
            loading="lazy"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`media-item ${className} media-type-${type}`}
      onClick={onClick}
    >
      <div className="media-container">
        {renderMedia()}
      </div>
      {caption && <p className="media-caption">{caption}</p>}
    </div>
  );
};

export default MediaItem; 