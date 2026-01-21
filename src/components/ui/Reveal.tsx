"use client";
import { useEffect, useRef, useState } from "react";
import React, { ReactNode } from "react";

const useIntersectionObserver = (
  options = {},
): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true); // Cast options to a more specific type if triggerOnce is always expected
        if (options && (options as { triggerOnce?: boolean }).triggerOnce)
          observer.unobserve(entry.target);
      }
    }, options as IntersectionObserverInit);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isIntersecting];
};

const Reveal = ({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  animation?: string;
  delay?: number;
  className?: string;
}) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const animations = {
    "fade-up": "translate-y-12 opacity-0",
    "fade-in": "opacity-0",
    "slide-left": "-translate-x-12 opacity-0",
    "slide-right": "translate-x-12 opacity-0",
    "scale-up": "scale-95 opacity-0",
  };

  const activeClasses = isVisible
    ? "translate-y-0 translate-x-0 opacity-100 scale-100"
    : animations[animation as keyof typeof animations];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeClasses} ${className}`}
    >
      {children}
    </div>
  );
};
export default Reveal;
