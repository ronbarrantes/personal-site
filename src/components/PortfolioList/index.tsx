import React from 'react'

import { portfolio } from '../../constants/text'
import PortfolioItem from '../PortfolioItem'
import './styles.css'

const PortfolioList = () => {

  return (
    <ul className="portfolio-list" >
      {portfolio.items.map((item, idx) => {
        return (
          <PortfolioItem
            key={`PortfolioItem${item.id}${idx}`}
            imgSrc={item.image}
            name={item.name}
            idx={idx}
          />
        )
      })}
    </ul>
  )
}
export default PortfolioList