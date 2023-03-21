// import classNames from 'classnames'

import Link from 'next/link'

import { Logo, Wrapper } from '@ui'
import { menu } from '@/client-data/data/nav-menu'
import { Nav } from '../nav/Nav'

const Header = () => {
  return (
    <header className="relative bg-neutral-800">
      <Wrapper className="flex flex-row items-center justify-between">
        <Link href="/" aria-label="home page" className="p-2">
          <Logo className="h-10 w-fit fill-neutral-100" />
        </Link>
        {menu.length > 1 && <Nav menu={menu} />}
      </Wrapper>
    </header>
  )
}

export default Header
