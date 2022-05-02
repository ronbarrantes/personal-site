import React from 'react'

import { render, cleanup, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import Img from './index'
const dogImg = 'doggie.png'

describe('Img component', () => {
  afterEach(cleanup)

  it('Should ensure the Img component is loaded', async () => {
    const { getByAltText } = render(<Img src={dogImg} alt="doggy" className="some-class" />)
    const spinner = getByAltText('spinner')
    const doggyImg = getByAltText('doggy')
    expect(spinner).toBeInTheDocument()

    fireEvent.load(doggyImg)
    expect(spinner).not.toBeInTheDocument()
    expect(doggyImg).toHaveAttribute('src', dogImg)
  })
})