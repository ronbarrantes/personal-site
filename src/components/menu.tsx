import React from 'react'

import { Constants } from '../content/constants'

const { Gallery, Email } = Constants.Menu

const Menu = (): JSX.Element => (
  <ul>
    <li>{Gallery.name}</li>
    <li>{Email.name}</li>
  </ul>
)

export default Menu
