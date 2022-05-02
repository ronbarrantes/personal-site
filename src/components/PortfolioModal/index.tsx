import React from 'react'

import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactDOM from 'react-dom'

import { portfolio } from '../../constants/text'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useSelectedIndex, useSetIsModalActive } from '../../hooks/usePortfolio'
// import { getUrlName } from '../../utils/basic'
import { PhotoCarousel } from '../PhotoCarousel'
import Wrapper from '../Wrapper'
// import TagList from '../TagList'
import './styles.css'

export const PortfolioModal = () => {
  const selectedIndex = useSelectedIndex()
  const setIsModalActive = useSetIsModalActive()

  const { items } = portfolio
  const { name, description, images, link, github, tags } = items[selectedIndex]

  const modalRef = useClickOutside(() => {
    setIsModalActive(false)
  })

  const tagList = tags ? tags.join(' | ') : ''

	// const ghName =

  return ReactDOM.createPortal (
    <Wrapper cssClass='modal-wrapper'>
      <div className="portfolio-modal" ref={modalRef}>
        <div className="close-btn portfolio-modal-close-btn" onClick={() => setIsModalActive(false)}>✕</div>
        <PhotoCarousel images={images} cssClass='photo-carousel-modal' />
        <div className="portfolio-modal-info">
          <h3 className="portfolio-modal-title">{name}</h3>
          <p>{description}</p>
          {link?.name && <a className="portfolio-modal-link" href={link.url}>{link.name}</a>}
          {github && <a className="portfolio-modal-link" href={github}>{<FontAwesomeIcon icon={faCodeBranch}/>} Repo</a>}
          {tagList.length !== 0 && <p>{tagList}</p>}
        </div>
      </div>
    </Wrapper>, document.getElementById('modal') as Element,
  )
}