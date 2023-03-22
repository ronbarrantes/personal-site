import { Container } from '@/ui'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-neutral-100">
      <Container className="flex flex-col items-center justify-center py-10 text-blue-800">{`Made with ❤️ by Ron | ${year}`}</Container>
    </footer>
  )
}

export default Footer
