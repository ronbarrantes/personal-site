import { Logo } from '../branding/Logo'

const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center border border-red-500">
      <h1 className="text-5xl font-bold">{`Ron's site 😊`}</h1>
      <Logo />
    </header>
  )
}

export default Header
