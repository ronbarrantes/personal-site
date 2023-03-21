// import classNames from 'classnames'

import { useScreenSize } from '@/client-data/hooks/use-screen-size'
import { Logo } from '../branding/Logo'

interface HeaderProps {
  children: React.ReactNode
}

const Header = ({ children }: HeaderProps) => {
  // const { width, height } = useScreenSize(window)
  // if (typeof window == 'undefined') return null

  return (
    <header className="relative flex flex-col items-center justify-center border border-red-500">
      <div className="text-small absolute top-0 left-0 text-green-400">
        {/* {`${width}px | ${height}px`} */}
      </div>
      {children}
      <h1 className="text-5xl font-bold">{`Ron's site 😊`}</h1>
    </header>
  )
}

export default Header
