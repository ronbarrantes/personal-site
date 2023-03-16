import React from 'react'

interface VercelProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

export const Vercel = (props: VercelProps) => (
  <svg
    width="47"
    height="40"
    viewBox="0 0 47 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M23.2637 0L46.5273 40H0L23.2637 0Z" fill="black" />
  </svg>
)