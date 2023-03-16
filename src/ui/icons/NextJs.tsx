import React from 'react'

interface NextJsProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

export const NextJs = (props: NextJsProps) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clip-path="url(#clip0_76_355)">
      <path
        d="M30.1874 2.77406C16.9578 -5.00475 0.147229 4.49609 0.00095836 19.8345C-0.141875 34.8124 15.709 44.4865 28.9088 37.8941L14.4969 16.6903L14.4969 29.8151C14.4969 31.2693 11.7142 31.2693 11.7142 29.8151V12.2204C11.7142 11.066 13.8585 10.9713 14.4661 11.9747L30.8929 36.7635C43.2329 28.8152 43.0661 10.3466 30.1874 2.77406ZM28.3315 27.613L25.5399 23.3492V11.6764C25.5399 10.588 28.3315 10.588 28.3315 11.6764V27.613Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_76_355">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
)