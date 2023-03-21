import classNames from 'classnames'

import { Container } from '@ui'
import { about } from '@/client-data/data/text'

const About = () => {
  return (
    <section id="About">
      <Container
        title={about.title}
        className="flex flex-col justify-center gap-2 p-10"
      >
        {about.description.map((item, idx) => {
          return <p key={`${item}-${idx}`}>{item}</p>
        })}
      </Container>
    </section>
  )
}

export default About
