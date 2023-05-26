import { Item } from './Item'
import usePortfolioContext from './PortfolioContext'

export const ItemDisplay = () => {
  const { index } = usePortfolioContext()
  return <Item index={index} />
}
