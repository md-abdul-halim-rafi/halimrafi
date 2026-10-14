'use client'

import { useSyncExternalStore } from 'react'

const noop = () => () => {}

/**
 * True once the client has taken over. The server snapshot is false, so controls
 * render disabled in the static HTML and never ship a button that does nothing.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  )
}
