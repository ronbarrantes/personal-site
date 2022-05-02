import React from 'react'

import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import '@testing-library/jest-dom'
import Portfolio from '.'

describe('Portfolio component', () => {
  afterEach(cleanup)

  it('Should render the portfolio component', () => {
    const { getByRole } = render(<Portfolio />)
    expect(getByRole('heading', { name: 'Portfolio' })).toBeInTheDocument()
  })
})