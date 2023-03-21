import Link from 'next/link'

import { menu } from '@/client-data/data/nav-menu'
export const Nav = () => {
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
