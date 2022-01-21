import React, { useState } from 'react'
// import LoadingImage from '../../assets/img/spinner.gif'
import './styles.css'

interface IImg {
	imgRef?: React.MutableRefObject<HTMLImageElement | undefined>
}

const Img: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement> & IImg> = ({ src, alt = '', imgRef, className = '' }) => {

		const [isLoaded, setIsLoaded] = useState(false)

		return (
			<>
				{!isLoaded && (
					<img 
						className={`spinner ${className}`} 
						src={'/public/assets/loading.gif'} alt="spinner" />

						// <p>Loading...</p>
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
