import React from 'react';

const BlurImage = ({ src, alt }) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className={`blur-load ${loaded ? 'image-loaded' : ''}`}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

export default BlurImage;