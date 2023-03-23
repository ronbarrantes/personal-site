import Link from 'next/link'

import { Container, Logo } from '@ui'
import { menu } from '@/client-data/data/nav-menu'
import { Nav } from '../nav/Nav'

const Header = () => {
  return (
    <header className="relative border border-transparent border-b-neutral-700 bg-neutral-800">
      <Container className="flex !flex-row items-center justify-between  !py-0 md:px-16">
        <Link href="/" aria-label="home page" className="w-fit p-2">
          <Logo className="h-10 w-fit fill-neutral-200" />
        </Link>
        {menu.length > 1 && <Nav menu={menu} />}
      </Container>
    </header>
  )
}

export default Header
