import React from 'react'

import { render, cleanup } from '@testing-library/react'

import { portfolio } from '../../constants/text'

import PortfolioList from '.'

describe('PortfolioList component', () => {
  afterEach(cleanup)

  it('Should get the correct number of portfolio items', () => {
    const { getAllByRole } = render(<PortfolioList />)
    expect(getAllByRole('listitem').length).toBe(portfolio.items.length)
  })
})