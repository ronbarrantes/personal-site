import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'

import { IWorkExperience } from '@/types'

interface IWorkHistoryContext {
  workHistory: IWorkExperience[]
  setWorkHistory: (workHistory: IWorkExperience[]) => void
  index: number
  setIndex: (i: number) => void
}

export const WorkHistoryContext = createContext<IWorkHistoryContext | null>(
  null,
)

const useWorkHistoryContext = () => {
  const context = useContext(WorkHistoryContext)
  if (!context) {
    throw new Error(
      'WorkHistoryCarousel.* must be a child of WorkHistoryCarousel',
    )
  }
  return {
    workHistory: context.workHistory,
    index: context.index,
    setIndex: context.setIndex,
  }
}

export default useWorkHistoryContext

// export const useWorkHistory = () => {
//   const { workHistory } = useContext(WorkHistoryContext)
//   return workHistory
// }

// export const useSetWorkHistory = () => {
//   const { setWorkHistory } = useContext(WorkHistoryContext)
//   return setWorkHistory
// }

// export const useIndex = () => {
//   const { index } = useContext(WorkHistoryContext)
//   return index
// }

// export const useSetIndex = () => {
//   const { setIndex } = useContext(WorkHistoryContext)
//   return setIndex
// }
