import React, { useRef } from 'react'

// import { useCurrImageSize } from '../../hooks/useCurrImageSize'
import { usePhotoCarousel } from '../../hooks/usePhotoCarousel'
import Img from '../Img'
import './styles.css'
interface IPhotoCarousel {
images: string[]
cssClass?: string
}

export const PhotoCarousel = ({ images, cssClass }: IPhotoCarousel) => {
  const { currImage, prev, next } = usePhotoCarousel(images)
  const imgRef = useRef<HTMLImageElement | undefined>(undefined)
// const { height } = useCurrImageSize(imgRef)

  return (
    <div className={`photo-carousel ${cssClass}`}>
      {images.length > 1 &&
<>
  <div
    className='photo-carousel-button button-prev'
    onClick={prev}
// style={{height: height}}
  >{`<`}</div>
  <div
    className='photo-carousel-button button-next'
    onClick={next}
// style={{height: height}}
  >{`>`}</div>
</>
      }
      <Img
        imgRef={imgRef}
        src={currImage}
        alt={`Gallery item `}
        className='photo-carousel-images'
      />
    </div>
  )
}