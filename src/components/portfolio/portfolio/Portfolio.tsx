import React, { ReactNode, useState } from 'react'

import { PortfolioItem } from '@/types'
import { ItemDisplay } from './ItemDisplay'
import { ItemList } from './ItemList'
import { PortfolioContext } from './PortfolioContext'

interface PortfolioProps {
  items: PortfolioItem[]
  children: ReactNode
  className?: string
}

export const Portfolio = ({ items, children }: PortfolioProps) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(items)
  const [index, setIndex] = useState<number>(0)

  return (
    <PortfolioContext.Provider
      value={{
        index,
        setIndex,
        portfolioItems,
        setPortfolioItems,
      }}
    >
      <div className="flex items-center gap-10 my-0 md:m-10">{children}</div>
    </PortfolioContext.Provider>
  )
}

Portfolio.ItemList = ItemList
Portfolio.ItemDisplay = ItemDisplay
