import { useState, useEffect } from 'react'

/**
 * Hook that calculates the current size of the viewing window
 * @returns width and height of the screen
 */
export const useScreenSize = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleScreenSize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleScreenSize)

    return () => {
      window.removeEventListener('resize', handleScreenSize)
    }
  })

  return { width, height }
}
