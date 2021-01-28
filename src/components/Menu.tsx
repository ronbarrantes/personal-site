import React from 'react'
import styled from '@emotion/styled'
import { Menu as MenuItems } from '../content/constants'
import { Link } from 'react-router-dom'

const color = 'darkgreen'

export const StyledNavLink = styled(Link)`
  background-color: hotpink;
  &:hover {
    color: ${color};
  }
`

const { Portfolio, Email } = MenuItems

const Menu = (): JSX.Element => (
  <ul>
    <li>
      <StyledNavLink to={Portfolio.link}>
        {Portfolio.name}
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
