import * as React from 'react'

type ListItem = {
  link?: string;
}

const MenuItem: React.FC<ListItem> = (props) => (
  <li>
    {props.children}
  </li>
)

const Menu: React.FC = () => (
  <ul>
    <MenuItem>Gallery</MenuItem>
    <MenuItem>Email</MenuItem>
  </ul>
)

export default Menu