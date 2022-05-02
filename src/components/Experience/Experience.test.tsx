import React from 'react'

import { render, cleanup } from '@testing-library/react'

import '@testing-library/jest-dom'
import Experience from '.'

describe('Experience component', () => {
  afterEach(cleanup)
  it('Should render the Experience component', () => {
    const { getByRole } = render(<Experience />)
    expect(getByRole('heading', { name: 'Experience' })).toBeInTheDocument()
  })
})