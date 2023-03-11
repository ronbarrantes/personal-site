import React, { useContext, createContext, useState, useCallback } from 'react'

interface IPortfolio {
	selectedIndex: number;
	setSelectedIndex: (i: number) => void;

	isModalActive: boolean;
	setIsModalActive: (i: boolean) => void;
}

const PortfolioContext = createContext<IPortfolio>({
  selectedIndex: 0,
  isModalActive: false,
  setSelectedIndex: () => {},
  setIsModalActive: () => {},
})

export const useSelectedIndex = () => {
  const { selectedIndex } = useContext(PortfolioContext)
  return selectedIndex
}

export const useSetSelectedIndex = () => {
  const { setSelectedIndex } = useContext(PortfolioContext)
  return setSelectedIndex
}

export const useModalActive = () => {
  const { isModalActive } = useContext(PortfolioContext)
  return isModalActive
}

export const useSetIsModalActive = () => {
  const { setIsModalActive } = useContext(PortfolioContext)
  return setIsModalActive
}

export const PortfolioProvider = ({ children }: { children: React.ReactNode}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isModalActive, setIsModalActive] = useState<boolean>(false)

  const cbSelectedIndex = useCallback((n: number) => {
    setSelectedIndex(n)
  }, [])

  const cbIsModalActive = useCallback((b: boolean) => {
    setIsModalActive(b)
  }, [])

  return (
    <PortfolioContext.Provider value={{
      selectedIndex, setSelectedIndex: cbSelectedIndex,
      isModalActive, setIsModalActive: cbIsModalActive,
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}