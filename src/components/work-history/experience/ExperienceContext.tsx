import { createContext, useContext } from 'react'

import { WorkExperience } from '@/types'

interface ExperienceContextInfo {
  workHistory: WorkExperience[]
  setWorkHistory: (workHistory: WorkExperience[]) => void
  index: number
  setIndex: (i: number) => void
}

export const ExperienceContext = createContext<ExperienceContextInfo | null>(
  null
)

const useExperience = () => {
  const context = useContext(ExperienceContext)
  if (!context) {
    throw new Error('Experience.* must be a child of Experience')
  }
  return {
    workHistory: context.workHistory,
    index: context.index,
    setIndex: context.setIndex,
  }
}

export default useExperience
