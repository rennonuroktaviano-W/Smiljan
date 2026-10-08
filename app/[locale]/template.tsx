/**
 * Soft page transition — PRD 4.5.
 *
 * A template remounts on every navigation, so this plays once per route
 * change: a short fade with a small lift, matching the scroll-reveal easing.
 * The animation is plain CSS (see `.page-enter` in globals.css) instead of a
 * motion.js client animation, so the very first paint of a route does not
 * have to wait for hydration — a JS-driven transition delayed the hero far
 * enough that Lighthouse recorded the cookie notice as the LCP element.
 * `prefers-reduced-motion` clamps the animation to 0.01ms.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div data-page-transition="" className="page-enter">
      {children}
    </div>
  );
}
