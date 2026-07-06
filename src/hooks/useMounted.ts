import { useEffect, useState } from 'react';

/**
 * Returns true once the component has mounted on the client.
 * Useful for avoiding SSR/hydration mismatches with browser APIs.
 */

// SSR (Server-Side Rendering) means Next.js first runs your code on the SERVER
// before sending it to the browser. The server has no window, localStorage, etc.
// This hook tells you when the code is finally running inside the real browser.
export function useMounted(): boolean {
  // Start as false because on the server the component is NOT yet mounted in a browser.
  // We only flip this to true once the browser has finished loading the component.
  const [mounted, setMounted] = useState(false);

  // useEffect ONLY runs in the browser, never on the server.
  // The empty [] at the end means "run this just once, right after the page loads".
  useEffect(() => {
    // Now we know we're in the browser — mark the component as mounted.
    setMounted(true);
  }, []);

  // Return the flag so other components can check: "Am I in the browser yet?"
  // If mounted is false, skip anything that needs browser APIs like window or localStorage.
  return mounted;
}
