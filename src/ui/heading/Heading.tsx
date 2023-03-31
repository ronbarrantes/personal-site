import React from 'react'
const headingType = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

type HeadingProps = {
  type: (typeof headingType)[number]
  className?: string
  children: React.ReactNode
}

export const Heading = ({ type, className, children }: HeadingProps) =>
  React.createElement(type, { className }, children)
