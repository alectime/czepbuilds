import React, { useState } from 'react';
import MediaItem, { MediaItemProps } from './MediaItem';
import '../styles/MediaGallery.css';

export type GalleryLayout = 'grid' | 'masonry' | 'carousel' | 'featured';

export interface MediaGalleryProps {
  items: Omit<MediaItemProps, 'onClick'>[];
  layout?: GalleryLayout;
  className?: string;
  columns?: number;
  enableLightbox?: boolean;
  gap?: number;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  items,
  layout = 'grid',
  className = '',
  columns = 3,
  enableLightbox = true,
  gap = 16
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index: number) => {
    if (enableLightbox) {
      setActiveIndex(index);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    } else {
      setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    }
  };

  const renderLightbox = () => {
    if (!lightboxOpen) return null;
    
    const item = items[activeIndex];
    
    return (
      <div className="media-lightbox" onClick={closeLightbox}>
        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          <button 
            className="lightbox-nav lightbox-prev" 
            onClick={() => navigateLightbox('prev')}
          >
            &#10094;
          </button>
          <MediaItem {...item} onClick={() => {}} />
          <button 
            className="lightbox-nav lightbox-next" 
            onClick={() => navigateLightbox('next')}
          >
            &#10095;
          </button>
          {item.caption && <p className="lightbox-caption">{item.caption}</p>}
          <div className="lightbox-counter">
            {activeIndex + 1} / {items.length}
          </div>
        </div>
      </div>
    );
  };

  const renderGalleryItems = () => {
    if (layout === 'carousel') {
      return (
        <div className="media-carousel">
          <div className="carousel-container">
            {items.map((item, index) => (
              <MediaItem 
                key={index} 
                {...item} 
                onClick={() => handleItemClick(index)}
                className="carousel-item"
              />
            ))}
          </div>
        </div>
      );
    }
    
    if (layout === 'featured') {
      const featuredItem = items[0];
      const restItems = items.slice(1);
      
      return (
        <>
          <div className="featured-item">
            <MediaItem 
              {...featuredItem} 
              onClick={() => handleItemClick(0)}
            />
          </div>
          <div 
            className="media-grid"
            style={{ 
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: `${gap}px`
            }}
          >
            {restItems.map((item, index) => (
              <MediaItem 
                key={index + 1} 
                {...item} 
                onClick={() => handleItemClick(index + 1)}
              />
            ))}
          </div>
        </>
      );
    }
    
    // Default to grid or masonry
    return (
      <div 
        className={`media-${layout}`}
        style={{ 
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`
        }}
      >
        {items.map((item, index) => (
          <MediaItem 
            key={index} 
            {...item} 
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`media-gallery layout-${layout} ${className}`}>
      {renderGalleryItems()}
      {enableLightbox && renderLightbox()}
    </div>
  );
};

export default MediaGallery; 