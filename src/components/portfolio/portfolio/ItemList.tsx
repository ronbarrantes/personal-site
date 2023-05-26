import { Item } from './Item'
import usePortfolioContext from './PortfolioContext'

export const ItemList = () => {
  const { portfolioItems } = usePortfolioContext()

  return (
    <ul className="flex flex-col lg:flex-row lg:flex-wrap">
      {portfolioItems.map((item, idx) => (
        <li className="flex lg:w-1/2" key={`${item.name}-${idx}`}>
          <Item index={idx} className="flex flex-col m-2 align-middle" />
        </li>
      ))}
    </ul>
  )
}
