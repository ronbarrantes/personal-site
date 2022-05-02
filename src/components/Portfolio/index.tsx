import React from 'react'

import { useModalActive,
  // useSetSelectedIndex, useSetIsModalActive,

} from '../../hooks/usePortfolio'
import PortfolioList from '../PortfolioList'
import { PortfolioModal } from '../PortfolioModal'
import Wrapper from '../Wrapper'
import './styles.css'

// TODO Start adding styles

const Portfolio = () => {
  const isModalActive = useModalActive()

  return (
    <Wrapper cssClass="portfolio-wrapper">
      <div id='portfolio' className='portfolio'>
        {isModalActive && <PortfolioModal />}
        <h2>Portfolio</h2>
        <p>{`This are some of the things I've done`}</p>
        <PortfolioList />
      </div>
    </Wrapper>
  )
}

export default Portfolio