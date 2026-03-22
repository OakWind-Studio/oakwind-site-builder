import { Phone } from 'lucide-react';
import { useScrollNav } from '../hooks/useScrollNav';
import { cn } from '../utils/cn';

export default function FloatingCTA({
  phone,
  label = 'Call Now',
  icon: Icon = Phone,
  threshold = 400,
  className,
}) {
  const { scrollY } = useScrollNav(threshold);
  const visible = scrollY > threshold;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300',
        visible ? 'translate-y-0' : 'translate-y-full',
        className
      )}
    >
      <a
        href={phone}
        className="flex items-center justify-center gap-2 w-full text-white font-semibold text-base"
        style={{
          height: 56,
          backgroundColor: 'var(--color-accent)',
        }}
      >
        <Icon size={20} />
        {label}
      </a>
    </div>
  );
}
