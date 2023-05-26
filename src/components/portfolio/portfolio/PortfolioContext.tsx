import { createContext, useContext } from 'react'

import { PortfolioItem } from '@/types'

interface PortfolioContextItems {
  portfolioItems: PortfolioItem[]
  setPortfolioItems: (portfolioItems: PortfolioItem[]) => void
  index: number
  setIndex: (i: number) => void
}

export const PortfolioContext = createContext<PortfolioContextItems | null>(
  null
)

const usePortfolioContext = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error(
      'WorkHistoryCarousel.* must be a child of WorkHistoryCarousel'
    )
  }
  return {
    portfolioItems: context.portfolioItems,
    index: context.index,
    setIndex: context.setIndex,
  }
}

export default usePortfolioContext
