import { mediaLinks } from '@/client-data/data/media-links'
import { Container } from '@/ui'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-neutral-100">
      <Container className="flex flex-col items-center justify-center py-10 text-blue-800">
        <nav>
          <ul className="flex items-center justify-center space-x-4">
            {mediaLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  className="underline hover:no-underline focus:no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {<div>Made with ❤️ by Ron • {year}</div>}
      </Container>
    </footer>
  )
}

export default Footer
