import React, { useEffect, useState } from 'react'

import './styles.css'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-scroll'

import { scrollOptions } from '../../constants/scrollOptions'

const menuItems = [
  {
    name: 'About',
    id: 'about',
  },
  // TODO: add back the menu stuff
  // {
  //   name: 'Portfolio',
  //   id: 'portfolio',
  // },
  {
    name: 'Experience',
    id: 'experience',
  },
  // {
  //   name: 'Contact',
  //   id: 'contact',
  // },
]

const Nav = () => {
  const smallSizeWidth = 550
  const { smooth, offset, duration } = scrollOptions
  const [ isNavOpen, setIsNavOpen ] = useState(window.innerWidth > smallSizeWidth)

	// TODO: make this into a hook somehow
	// TODO: add a debounce (maybe)
	// TODO: get click outside to work with the nav
  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth < smallSizeWidth)
        isNavOpen && setIsNavOpen(false)
      else
        !isNavOpen && setIsNavOpen(true)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <>
      <button className="nav-burger-btn" onClick={() => setIsNavOpen(!isNavOpen)}>
        {<FontAwesomeIcon icon={isNavOpen ? faTimes : faBars}/>}
      </button>

      <ul
        className={`nav ${!isNavOpen ? 'nav-is-open' : ''}`}
      >
        {menuItems.map(
          (item, i) => (
            <li className='nav-li' key={`${item}-${i}`} >{
              <Link
                onClick={() => setIsNavOpen(!isNavOpen)}
                className='nav-link'
                to={item.id}
                smooth={smooth}
                offset={offset}
                duration={duration}
              >
                {item.name}
              </Link>
            }
            </li>
          ))}
      </ul>
    </>
  )
}

export default Nav