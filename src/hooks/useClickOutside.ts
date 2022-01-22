import { useRef, useEffect } from 'react'

/**
 * Detects when a click has occurred outside of the current element
 * @param handler function that executes when clicking outside
 * @returns useRef
 */
export const useClickOutside = (handler: () => void) => {
  const domRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if(!domRef.current?.contains(event.target as HTMLDivElement))
        handler()
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  })

  return domRef
}
