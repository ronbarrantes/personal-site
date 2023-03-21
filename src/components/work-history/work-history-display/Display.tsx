import React, { ReactNode, useState } from 'react'

import { IWorkExperience } from '@/types'
import { Item } from './Item'
import { Nav } from './Nav'
import { WorkHistoryContext } from './WorkHistoryContext'

interface DisplayProps {
  items: IWorkExperience[]
  children: ReactNode
  className?: string
}

export const Display = ({ items, children, className }: DisplayProps) => {
  const [workHistory, setWorkHistory] = useState<IWorkExperience[]>(items)
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
      <div className="m-10 my-0 flex w-1/2 items-center gap-10 border border-pink-300">
        {children}
      </div>
    </WorkHistoryContext.Provider>
  )
}

Display.Nav = Nav
Display.Item = Item
