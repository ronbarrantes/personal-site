import Link from 'next/link'

import { TLink } from '@/types'

export const Nav = ({ menu }: { menu: TLink[] }) => {
  return (
    <nav>
      <ul className="flex gap-3">
        {menu.map((item, idx) => (
          <li key={`${item.label}-${idx}`}>
            <Link
              href={item.href}
              className=" rounded-lg bg-purple-600 p-4 py-2"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
