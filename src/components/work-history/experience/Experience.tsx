import React, { ReactNode, useState } from 'react'

import { WorkExperience } from '@/types'
import { ItemDisplay } from './ItemDisplay'
import { ItemList } from './ItemList'
import { Nav } from './Nav'
import { WorkHistoryContext } from './WorkHistoryContext'

interface ExperienceProps {
  items: WorkExperience[]
  children: ReactNode
  className?: string
}

export const Experience = ({ items, children, className }: ExperienceProps) => {
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
      <div className="my-0 flex items-center gap-10 md:m-10">{children}</div>
    </WorkHistoryContext.Provider>
  )
}

Experience.ItemList = ItemList
// IMMA GONNA DO SOMETHING WITH THIS LATER, JUST DONT HAVE TIME RN
Experience.Nav = Nav
Experience.ItemDisplay = ItemDisplay
