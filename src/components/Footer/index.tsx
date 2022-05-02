import React from 'react'

import './styles.css'
import { mediaLinks } from '../../constants/text'
import Wrapper from '../Wrapper'

// TODO Start adding styles

const Footer = () => (
  <Wrapper cssClass="footer-wrapper">
    <div className="footer">
      <ul className="footer-ul">
        {mediaLinks.items.map(
          (item, i) => (
            <li className="footer-li" key={`media-${i}`}>
              <a className="footer-media-links" href={item.url} target="_blank" rel="noreferrer">
                {item.name}
              </a>
            </li>
          ),
        )}
      </ul>
      <p>Thank you for visiting 😊</p>
    </div>
  </Wrapper>
)

export default Footer