import useExperience from './ExperienceContext'
import { Item } from './Item'

export const ItemDisplay = () => {
  const { index } = useExperience()
  return <Item index={index} />
}
