import { createContext, useContext } from 'react'

import { IWorkExperience } from '@/types'

interface IWorkHistoryContext {
  workHistory: IWorkExperience[]
  setWorkHistory: (workHistory: IWorkExperience[]) => void
  index: number
  setIndex: (i: number) => void
}

export const WorkHistoryContext = createContext<IWorkHistoryContext | null>(
  null
)

const useWorkHistoryContext = () => {
  const context = useContext(WorkHistoryContext)
  if (!context) {
    throw new Error(
      'WorkHistoryCarousel.* must be a child of WorkHistoryCarousel'
    )
  }
  return {
    workHistory: context.workHistory,
    index: context.index,
    setIndex: context.setIndex,
  }
}

export default useWorkHistoryContext
