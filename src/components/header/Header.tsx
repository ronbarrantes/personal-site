import { Logo } from '../branding/Logo'
import classNames from 'classnames'
import { useScreenSize } from '@/client-data/hooks/use-screen-size'

const Header = () => {
  const { width, height } = useScreenSize()

  return (
    <header className="relative flex flex-col items-center justify-center border border-red-500">
      <div className="text-small absolute top-0 left-0 text-green-400">
        {`${width}px | ${height}px`}
      </div>
      <h1 className="text-5xl font-bold">{`Ron's site 😊`}</h1>

      {/* <Logo /> */}
    </header>
  )
}

export default Header
