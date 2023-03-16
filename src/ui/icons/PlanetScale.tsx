import React from 'react'

interface PlanetScaleProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

export const PlanetScale = (props: PlanetScaleProps) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M39.997 20C39.997 25.3043 37.8899 30.3914 34.1391 34.1421C30.3884 37.8929 25.3013 40 19.997 40L39.997 20ZM19.997 0C28.122 0 35.1064 4.84375 38.247 11.7969L11.7939 38.25C10.6532 37.7344 9.57511 37.125 8.55949 36.4219L24.997 20H19.997L5.85636 34.1406C3.05992 31.3436 1.15559 27.7802 0.384138 23.901C-0.387316 20.0218 0.00874534 16.0009 1.52225 12.3467C3.03575 8.69259 5.59874 5.56924 8.88716 3.37157C12.1756 1.1739 16.0418 0.000597403 19.997 0Z"
      fill="black"
    />
  </svg>
)
