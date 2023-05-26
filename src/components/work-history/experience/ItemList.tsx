import useExperience from './ExperienceContext'
import { Item } from './Item'

export const ItemList = () => {
  const { workHistory } = useExperience()

  return (
    <ul className="flex flex-col lg:flex-row lg:flex-wrap">
      {workHistory.map((item, idx) => (
        <li className="flex lg:w-1/2" key={`${item.employer}-${idx}`}>
          <Item index={idx} className="m-2 flex flex-col align-middle" />
        </li>
      ))}
    </ul>
  )
}
