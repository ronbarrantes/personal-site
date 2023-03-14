import { Nav } from './Nav'
import { Item } from './Item'

import { WorkHistoryContext } from './WorkHistoryContext'
import { IWorkExperience } from '@/types'
import { ReactNode, useState } from 'react'

export const Display = ({
  items,
  children,
}: {
  items: IWorkExperience[]
  children: ReactNode
}) => {
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
      {children}
    </WorkHistoryContext.Provider>
  )
}

Display.Nav = Nav
Display.Item = Item
