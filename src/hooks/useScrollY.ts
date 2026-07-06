import { useEffect, useState } from 'react';

/**
 * Tracks the current scroll position (Y offset).
 */
export function useScrollY(): number {
  // Store how many pixels the user has scrolled down. Starts at 0 (top of page).
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // window.scrollY gives the number of pixels scrolled from the top of the page.
    // Every time the user scrolls, we save that new number into state.
    const handleScroll = () => setScrollY(window.scrollY);

    // Listen for the browser's scroll event and call handleScroll each time it fires.
    // { passive: true } is a performance hint — it tells the browser this listener
    // will NOT call preventDefault(), so the browser can scroll smoothly without waiting.
    window.addEventListener('scroll', handleScroll, { passive: true });

    // This cleanup function runs when the component using this hook is removed from the page.
    // We remove the listener so it doesn't keep running in the background and waste memory.
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty [] means set up the listener only once when the component first loads.

  // Give back the current scroll position so any component can use it.
  return scrollY;
}
