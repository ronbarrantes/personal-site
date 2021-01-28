import React from 'react'
import styled from '@emotion/styled'
import { Constants } from '../content/constants'
import { Link } from 'react-router-dom'

const color = 'darkgreen'

export const StyledNavLink = styled(Link)`
  background-color: hotpink;
  &:hover {
    color: ${color};
  }
`

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
