import React from 'react'

interface TypeScriptProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

export const TypeScript = (props: TypeScriptProps) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 20V0H40V40H0" fill="#007ACC" />
    <path
      d="M8.77002 20.07V21.7H13.97V36.5H17.66V21.7H22.86V20.1C22.86 19.2 22.86 18.47 22.82 18.45C22.82 18.42 19.65 18.41 15.8 18.41L8.80002 18.44V20.08L8.77002 20.07ZM32.14 18.4C33.16 18.64 33.94 19.1 34.64 19.83C35.01 20.23 35.56 20.93 35.6 21.11C35.6 21.17 33.87 22.34 32.82 22.99C32.78 23.02 32.62 22.85 32.46 22.59C31.94 21.85 31.41 21.53 30.58 21.47C29.38 21.39 28.58 22.02 28.58 23.07C28.58 23.39 28.64 23.57 28.76 23.83C29.03 24.38 29.53 24.71 31.08 25.39C33.94 26.62 35.18 27.43 35.93 28.59C36.78 29.89 36.97 31.93 36.4 33.46C35.76 35.13 34.2 36.26 31.97 36.63C31.27 36.75 29.67 36.73 28.92 36.6C27.32 36.3 25.79 35.5 24.85 34.47C24.48 34.07 23.77 33 23.81 32.93L24.19 32.69L25.69 31.82L26.82 31.16L27.08 31.51C27.41 32.03 28.15 32.73 28.58 32.97C29.88 33.64 31.62 33.55 32.48 32.77C32.85 32.43 33.01 32.07 33.01 31.57C33.01 31.11 32.94 30.9 32.71 30.55C32.39 30.11 31.75 29.75 29.95 28.95C27.88 28.07 27 27.51 26.18 26.65C25.71 26.13 25.28 25.32 25.08 24.65C24.93 24.07 24.88 22.65 25.02 22.08C25.45 20.08 26.96 18.68 29.12 18.28C29.82 18.14 31.47 18.2 32.16 18.38L32.14 18.4Z"
      fill="white"
    />
  </svg>
)
