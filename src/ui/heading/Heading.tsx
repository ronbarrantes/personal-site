import React from 'react'
type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type HeadingProps = {
  type: HeadingType
  className?: string
  children: React.ReactNode
}

export const Heading = ({ type, className, children }: HeadingProps) =>
  React.createElement(type, { className }, children)
