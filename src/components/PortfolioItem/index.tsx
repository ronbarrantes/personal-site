import React from 'react'

import { useSetSelectedIndex, useSetIsModalActive } from '../../hooks/usePortfolio'
import Img from '../Img'
import './styles.css'

interface IPortfolioItem {
	idx: number
	imgSrc: string;
	name: string;
}

const PortfolioItem = ({ imgSrc, name, idx }: IPortfolioItem) => {
  const setSelectedIndex = useSetSelectedIndex()
  const setModalActive = useSetIsModalActive()

  const handleClick = () => {
    setSelectedIndex(idx)
    setModalActive(true)
  }

  return (
    <li onClick={handleClick} className="portfolio-item">
      <Img src={imgSrc} alt={name}/>
      <p className='portfolio-item-name'>{name}</p>
    </li>
  )
}

export default PortfolioItem