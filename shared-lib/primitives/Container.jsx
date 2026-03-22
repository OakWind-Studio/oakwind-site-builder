import { cn } from '../utils/cn';

const maxWidthMap = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export default function Container({
  maxWidth = 'lg',
  padding = true,
  as: Tag = 'div',
  className,
  children,
}) {
  return (
    <Tag
      className={cn(
        'mx-auto',
        maxWidthMap[maxWidth] || maxWidthMap.lg,
        padding && 'px-5 md:px-8',
        className
      )}
    >
      {children}
    </Tag>
  );
}
