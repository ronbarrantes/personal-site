import React from 'react'
import styled from '@emotion/styled'

import { Constants } from '../content/constants'
import { Link } from 'react-router-dom'

export const StyledNavLink = styled(Link)``

const { Gallery, Email } = Constants.Menu

const Menu = (): JSX.Element => (
  <ul>
    <li>
      <StyledNavLink to={Gallery.link}>
        {Gallery.name}
      </StyledNavLink>
    </li>
    <li>
      <StyledNavLink to={Email.link}>
        {Email.name}
      </StyledNavLink>
    </li>
  </ul>
)

export default Menu
