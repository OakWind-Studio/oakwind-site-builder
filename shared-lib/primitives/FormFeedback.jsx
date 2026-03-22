import { useState, useEffect } from 'react';
import { CircleCheck, AlertCircle, X } from 'lucide-react';
import { cn } from '../utils/cn';

export default function FormFeedback({
  type,
  message,
  onDismiss,
  autoDismiss = 0,
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoDismiss > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onDismiss?.();
      }, autoDismiss);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, onDismiss]);

  if (!visible || !message) return null;

  const isSuccess = type === 'success';
  const Icon = isSuccess ? CircleCheck : AlertCircle;

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg animate-[fadeIn_300ms_ease-out]',
        isSuccess
          ? 'bg-green-50 text-green-800 border border-green-200'
          : 'bg-red-50 text-red-800 border border-red-200'
      )}
      role="alert"
    >
      <Icon size={20} className="shrink-0 mt-0.5" />
      <p className="flex-1 text-sm">{message}</p>
      {onDismiss && (
        <button
          onClick={() => {
            setVisible(false);
            onDismiss();
          }}
          className="shrink-0 p-0.5 rounded hover:bg-black/5 transition-colors"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
