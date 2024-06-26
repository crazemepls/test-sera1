import { useEffect, useRef, useCallback } from 'react';

const useIntersectionObserver = (callback, options) => {
  const observerRef = useRef(null);

  const setRef = useCallback((node) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (node) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback(entry);
          }
        });
      }, options);
      observerRef.current.observe(node);
    }
  }, [callback, options]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return setRef;
};

export default useIntersectionObserver;
