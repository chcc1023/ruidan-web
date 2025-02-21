import { useEffect, useState } from 'react';

export function useInView(ref: React.RefObject<HTMLElement | null>, options = {}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentElement = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options
    });

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [ref, options]);

  return isInView;
} 
