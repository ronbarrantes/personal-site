import React, { useEffect, useState } from 'react'

// TODO: use css image sizing thingy
// TODO: Remove if not in use
interface Size {
  width: number | undefined
  height: number | undefined
}

export const useCurrImageSize = (
  ref: React.MutableRefObject<HTMLImageElement | undefined>
) => {
  const [size, getSize] = useState<Size>({
    width: ref.current?.width,
    height: ref.current?.height,
  })

  useEffect(() => {
    const handleResize = () => {
      getSize({
        width: ref.current?.width,
        height: ref.current?.height,
      })
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('click', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('click', handleResize)
    }
  })

  return {
    width: size.width,
    height: size.height,
  }
}
