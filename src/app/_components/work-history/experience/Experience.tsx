'use client'
import React, { ReactNode, useState } from 'react'

import classNames from 'classnames'

import { WorkExperience } from '@/types'
import { ExperienceContext } from './ExperienceContext'
import { ItemDisplay } from './ItemDisplay'
import { ItemList } from './ItemList'
import { Nav } from './Nav'

interface ExperienceProps {
  items: WorkExperience[]
  children: ReactNode
  className?: string
}

export const Experience = ({ items, children, className }: ExperienceProps) => {
  const [workHistory, setWorkHistory] = useState<WorkExperience[]>(items)
  const [index, setIndex] = useState<number>(0)

  return (
    <ExperienceContext.Provider
      value={{
        workHistory,
        setWorkHistory,
        index,
        setIndex,
      }}
    >
      <div
        className={classNames(
          'flex items-center gap-10 my-0 md:m-10',
          className,
        )}
      >
        {children}
      </div>
    </ExperienceContext.Provider>
  )
}

Experience.ItemList = ItemList
// IMMA GONNA DO SOMETHING WITH THIS LATER, JUST DONT HAVE TIME RN
Experience.Nav = Nav
Experience.ItemDisplay = ItemDisplay
