import React from 'react'

interface CssProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

export const Css = (props: CssProps) => (
  <svg
    width="36"
    height="40"
    viewBox="0 0 36 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M35.27 0L32.0568 35.9958L17.6134 40L3.20978 36.0015L0 0H35.27Z"
      fill="#264DE4"
    />
    <path
      d="M29.3062 33.7037L32.0521 2.94363H17.6353V36.9394L29.3062 33.7037Z"
      fill="#2965F1"
    />
    <path
      d="M7.35815 16.2961L7.7539 20.7114H17.6348V16.2961H7.35815Z"
      fill="#EBEBEB"
    />
    <path
      d="M17.635 7.35915H17.6198H6.56323L6.96461 11.7746H17.635V7.35915Z"
      fill="#EBEBEB"
    />
    <path
      d="M17.6348 32.3573V27.7634L17.6154 27.7686L12.6979 26.4407L12.3836 22.9192H9.99405H7.95117L8.56977 29.8521L17.6145 32.363L17.6348 32.3573Z"
      fill="#EBEBEB"
    />
    <path
      d="M23.057 20.7115L22.5445 26.438L17.6199 27.7671V32.3609L26.6717 29.8521L26.7382 29.1061L27.7757 17.4818L27.8835 16.2961L28.6806 7.35915H17.6199V11.7746H23.8417L23.4399 16.2961H17.6199V20.7115H23.057Z"
      fill="white"
    />
  </svg>
)