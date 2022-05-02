import React from 'react'

import { render, cleanup } from '@testing-library/react'

import '@testing-library/jest-dom'
import App from '.'

describe('App component', () => {
  afterEach(cleanup)

  it('Should ensure the App component is loaded', () => {
    const { container } = render(<App />)
    expect(container).toBeInTheDocument()
  })

  it('Should ensure the App component has a class name "App"', () => {
    const { container } = render(<App />)
    expect(container.firstChild).toHaveClass('App')
  })
})