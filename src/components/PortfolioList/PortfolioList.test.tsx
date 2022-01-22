import React from 'react'
import { render, cleanup } from '@testing-library/react'
import PortfolioList from '.'
import { portfolio } from '../../constants/text'

describe('PortfolioList component', () => {
  afterEach(cleanup)

  it('Should get the correct number of portfolio items', () => {
    const { getAllByRole } = render(<PortfolioList />)
    expect(getAllByRole('listitem').length).toBe(portfolio.items.length)
  })
})