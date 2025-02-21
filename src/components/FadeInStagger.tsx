import { useInView } from '@/hooks/useInView';

interface FadeInStaggerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

export function FadeInStagger({ children, className = '', delay = 0.2, index = 0 }: FadeInStaggerProps) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{
        transitionDelay: `${index * delay}s`
      }}
    >
      {children}
    </div>
  );
} 