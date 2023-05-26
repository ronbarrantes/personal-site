import React, { ReactNode, useState } from 'react'

import { WorkExperience } from '@/types'
import { ItemDisplay } from './ItemDisplay'
import { ItemList } from './ItemList'
import { WorkHistoryContext } from './WorkHistoryContext'

interface PortfolioProps {
  items: WorkExperience[]
  children: ReactNode
  className?: string
}

export const Portfolio = ({ items, children, className }: PortfolioProps) => {
  const [workHistory, setWorkHistory] = useState<WorkExperience[]>(items)
  const [index, setIndex] = useState<number>(0)

  return (
    <WorkHistoryContext.Provider
      value={{
        workHistory,
        setWorkHistory,
        index,
        setIndex,
      }}
    >
      <div className="flex items-center gap-10 my-0 md:m-10">{children}</div>
    </WorkHistoryContext.Provider>
  )
}

Portfolio.ItemList = ItemList
Portfolio.ItemDisplay = ItemDisplay
