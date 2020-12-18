import * as React from 'react'
import { Constants } from '../content/constants'

const { Gallery, Email } = Constants.Menu

type ListItem = {
  link?: string;
}
// ADD REACT ROUTER DOM LINK
const MenuItem: React.FC<ListItem> = (props) => <li><a>{props.children}</a></li>

const Menu: React.FC = () => (
  <ul>
    <MenuItem>{Gallery.name}</MenuItem>
    <MenuItem>{Email.name}</MenuItem>
  </ul>
)

export default Menu