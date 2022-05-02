import React from 'react'

import './styles.css'
import Logo from '../Logo'
import Nav from '../Nav'
import Wrapper from '../Wrapper'

const Header = () => (
  <Wrapper cssClass='header-wrapper'>
    <div className='header'>
      <Logo />
      <Nav />
    </div>
  </Wrapper>
)

export default Header