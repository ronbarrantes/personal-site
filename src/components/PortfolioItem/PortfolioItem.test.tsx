import React from 'react'

import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { portfolio } from '../../constants/text'

import PortfolioItem from '.'

describe('PortfolioItem component', () => {
  afterEach(cleanup)

  it('Should get the first portfolio item', () => {
    const idx = 0
    const firstItem = portfolio.items[idx]
    const { name, image } = firstItem

    const { getByAltText, getByText } = render(
      <PortfolioItem
        idx={idx}
        imgSrc={image}
        name={name}
      />)

    const img = getByAltText(name)
    fireEvent.load(img)

    expect(img).toHaveAttribute('alt', name)
    expect(img).toHaveAttribute('src', image)
    expect(getByText(name)).toBeInTheDocument()
  })
})