import { menu } from '@/client-data/data/nav-menu'
export const Nav = () => {
  return (
    <nav>
      <ul className="flex border border-red-500">
        {menu.map((item, idx) => (
          <li key={`${item.label}-${idx}`}>{item.label}</li>
        ))}
      </ul>
    </nav>
  )
}
