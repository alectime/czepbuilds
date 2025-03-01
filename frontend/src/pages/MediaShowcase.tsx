import React from 'react';
import MediaGallery from '../components/MediaGallery';
import '../styles/MediaShowcase.css';

const MediaShowcase: React.FC = () => {
  // Example media items - replace with your actual content
  const photoGalleryItems = [
    {
      src: 'https://source.unsplash.com/random/800x600?architecture',
      alt: 'Architecture photo',
      type: 'image' as const,
      caption: 'Modern Architecture Design'
    },
    {
      src: 'https://source.unsplash.com/random/800x600?nature',
      alt: 'Nature photo',
      type: 'image' as const,
      caption: 'Natural Landscape'
    },
    {
      src: 'https://source.unsplash.com/random/800x600?technology',
      alt: 'Technology photo',
      type: 'image' as const,
      caption: 'Modern Technology'
    },
    {
      src: 'https://source.unsplash.com/random/800x600?design',
      alt: 'Design photo',
      type: 'image' as const,
      caption: 'Design Elements'
    },
    {
      src: 'https://source.unsplash.com/random/800x600?workspace',
      alt: 'Workspace photo',
      type: 'image' as const,
      caption: 'Creative Workspace'
    },
    {
      src: 'https://source.unsplash.com/random/800x600?code',
      alt: 'Code photo',
      type: 'image' as const,
      caption: 'Programming Code'
    }
  ];

  const videoGalleryItems = [
    {
      src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      alt: 'Sample video 1',
      type: 'video' as const,
      caption: 'Sample Video 1',
      thumbnail: 'https://source.unsplash.com/random/800x600?video'
    },
    {
      src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      alt: 'Sample video 2',
      type: 'video' as const,
      caption: 'Sample Video 2',
      thumbnail: 'https://source.unsplash.com/random/800x600?cinema'
    }
  ];

  const gifGalleryItems = [
    {
      src: 'https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif',
      alt: 'Coding GIF',
      type: 'gif' as const,
      caption: 'Coding Animation'
    },
    {
      src: 'https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif',
      alt: 'Tech GIF',
      type: 'gif' as const,
      caption: 'Tech Animation'
    },
    {
      src: 'https://media.giphy.com/media/l3q2zVr6cu95nF6O4/giphy.gif',
      alt: 'Development GIF',
      type: 'gif' as const,
      caption: 'Development Animation'
    }
  ];

  return (
    <div className="media-showcase">
      <div className="container">
        <section className="showcase-section">
          <h2>Project Photos</h2>
          <p>A collection of images from recent projects and designs</p>
          <MediaGallery 
            items={photoGalleryItems} 
            layout="grid" 
            columns={3}
          />
        </section>

        <section className="showcase-section">
          <h2>Featured Project</h2>
          <p>Highlighting our most recent work with a featured layout</p>
          <MediaGallery 
            items={photoGalleryItems.slice(0, 4)} 
            layout="featured" 
            columns={3}
          />
        </section>

        <section className="showcase-section">
          <h2>Video Showcase</h2>
          <p>Watch demonstrations of our projects in action</p>
          <MediaGallery 
            items={videoGalleryItems} 
            layout="grid" 
            columns={2}
            gap={24}
          />
        </section>

        <section className="showcase-section">
          <h2>Interactive Elements</h2>
          <p>Animations and interactive components from our projects</p>
          <MediaGallery 
            items={gifGalleryItems} 
            layout="carousel"
          />
        </section>
      </div>
    </div>
  );
};

export default MediaShowcase; 