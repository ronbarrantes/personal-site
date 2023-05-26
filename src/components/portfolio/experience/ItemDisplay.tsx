import { Item } from './Item'
import useWorkHistoryContext from './WorkHistoryContext'

export const ItemDisplay = () => {
  const { index } = useWorkHistoryContext()
  return <Item index={index} />
}
