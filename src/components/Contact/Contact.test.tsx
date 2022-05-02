import React from 'react'

import { render, cleanup } from '@testing-library/react'

import '@testing-library/jest-dom'
import Contact from '.'

describe('Experience component', () => {
  afterEach(cleanup)
  it('Should render the Experience component', () => {
    const { getByRole } = render(<Contact />)
    expect(getByRole('heading', { name: 'Contact' })).toBeInTheDocument()
  })
})