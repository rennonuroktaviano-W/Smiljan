/**
 * One shared IntersectionObserver for every scroll-reveal on the page.
 *
 * The home page alone can mount thirty `Reveal` elements; giving each its own
 * observer means thirty callbacks firing on every scroll tick. Sharing one
 * instance and keeping a per-element callback map keeps that to a single
 * observer for the whole document.
 */
type RevealCallback = (entry: IntersectionObserverEntry) => void;

const callbacks = new WeakMap<Element, RevealCallback>();

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined') return null;
  if (typeof IntersectionObserver === 'undefined') return null;

  if (observer === null) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          callbacks.get(entry.target)?.(entry);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    );
  }

  return observer;
}

/** True when the browser can actually animate reveals. */
export function canObserve(): boolean {
  return getObserver() !== null;
}

export function observeReveal(element: Element, callback: RevealCallback): void {
  const instance = getObserver();
  if (!instance) return;

  callbacks.set(element, callback);
  instance.observe(element);
}

export function unobserveReveal(element: Element): void {
  callbacks.delete(element);
  observer?.unobserve(element);
}