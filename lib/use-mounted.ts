'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * False during SSR and the hydration render, true afterwards.
 *
 * `useSyncExternalStore` is used rather than a `useState` + `useEffect` pair so
 * the value is part of the render itself — no effect, and therefore no
 * cascading render after mount.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}