import { useState } from 'react';
import { cn } from '../utils/cn';

export default function BlurUp({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={cn(
        'object-cover w-full h-full transition-all duration-700',
        loaded
          ? 'blur-0 scale-100 opacity-100'
          : 'blur-md scale-105 opacity-0',
        className
      )}
    />
  );
}
