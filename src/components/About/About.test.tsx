import React from 'react'

import { render, cleanup } from '@testing-library/react'

import { about } from '../../constants/text'

import '@testing-library/jest-dom'
import About from '.'

describe('About component', () => {
  afterEach(cleanup)

  it('Should ensure the About component is loaded', async () => {
    const { getByRole } = render(<About />)
    const heading = getByRole('heading', { name: /about/i })
    expect(heading).toBeInTheDocument()
  })

  it('Should get the correct description', () => {
    const { getByText } = render(<About />)
    about.description.forEach(desc => {
      expect(getByText(desc)).toBeInTheDocument()
    })
  })
})