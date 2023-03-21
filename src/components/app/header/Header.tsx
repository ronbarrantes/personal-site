// import classNames from 'classnames'

import Link from 'next/link'

import { Logo } from '@components/branding/Logo'
import { Wrapper } from '@components/wrapper/Wrapper'
import { Nav } from '../nav/Nav'

const Header = () => {
  return (
    <header className="relative  border border-red-500">
      <Wrapper className="flex flex-row items-center justify-between">
        <Link href="/" aria-label="home page" className="p-2">
          <Logo className="h-10 w-fit fill-neutral-100" />
        </Link>
        <Nav />
      </Wrapper>
    </header>
  )
}

export default Header
