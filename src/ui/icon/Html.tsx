import React from 'react'

interface HtmlProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

export const Html = (props: HtmlProps) => (
  <svg
    width="36"
    height="40"
    viewBox="0 0 36 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.20312 35.9375L0 0H35.2344L32.0312 35.9375L17.5781 40"
      fill="#E34F26"
    />
    <path
      d="M17.6562 36.875L29.2969 33.6719L32.0312 2.89062H17.6562"
      fill="#EF652A"
    />
    <path
      d="M17.6562 16.25H11.7969L11.4062 11.7188H17.6562V7.34375H17.5781H6.5625L6.64062 8.51562L7.73438 20.7031H17.6562V16.25ZM17.6562 27.7344H17.5781L12.6562 26.4062L12.3438 22.8906H10H7.96875L8.51562 29.8438L17.5781 32.3438H17.6562V27.7344Z"
      fill="#EBEBEB"
    />
    <path
      d="M17.5781 16.25V20.7031H23.0469L22.5 26.4062L17.5781 27.7344V32.3438L26.6406 29.8438L26.7188 29.0625L27.7344 17.4219L27.8906 16.25H26.6406H17.5781ZM17.5781 7.34375V10.0781V11.7188H28.2812L28.3594 10.7812L28.5938 8.51562L28.6719 7.34375H17.5781Z"
      fill="white"
    />
  </svg>
)
