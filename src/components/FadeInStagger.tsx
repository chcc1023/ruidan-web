import { useInView } from '@/hooks/useInView';
import { useRef } from 'react';

interface FadeInStaggerProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
}

export function FadeInStagger({ children, index = 0, className = '' }: FadeInStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 delay-[${index * 100}ms] ${
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
} 
