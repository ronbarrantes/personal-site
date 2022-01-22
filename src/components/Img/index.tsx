import React, { useState } from 'react'
// import LoadingImage from '../../assets/img/spinner.gif'
import './styles.css'

interface IImg {
imgRef?: React.MutableRefObject<HTMLImageElement | undefined>
src?: string
alt?: string
className?: string
}

const Img: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>,
HTMLImageElement> & IImg> = ({ src, alt = '', imgRef, className = '' }) => {

  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      {!isLoaded && (
        <img
          className={`spinner ${className}`}
          src={'./public/assets/loading.gif'} alt="spinner" />
      )}
      {React.createElement('img', {
        className: `${className}`,
        src,
        alt,
        onLoad: () => setIsLoaded(true),
        style: isLoaded ? {} : { display: 'none' },
        ref: imgRef,
      })}
    </>
  )
}

export default Img
