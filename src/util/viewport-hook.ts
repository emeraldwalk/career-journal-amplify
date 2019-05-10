import { useEffect } from "react";

function setVh() {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

/**
 * Hook to calculate our viewport height and add it to the
 * dom as a css variable. Useful for mobile browsers that
 * have status bars that cover the viewport real estate.
 * Idea from here: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
export function useViewportHeight() {
  useEffect(() => {
    window.addEventListener('resize', setVh);
    setVh();

    return function cleanup() {
      window.removeEventListener('resize', setVh);
    };
  }, []);
}