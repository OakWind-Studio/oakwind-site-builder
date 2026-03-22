import { ImageOff } from 'lucide-react';
import { cn } from '../utils/cn';

export default function ImageError({ alt, className, icon: Icon = ImageOff }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 w-full h-full min-h-[120px] rounded',
        className
      )}
      style={{
        backgroundColor: 'var(--color-border)',
        color: 'var(--color-muted)',
      }}
      role="img"
      aria-label={alt || 'Image unavailable'}
    >
      <Icon size={32} strokeWidth={1.5} />
      <span className="text-sm">Image unavailable</span>
    </div>
  );
}
