import classNames from 'classnames'

import { Wrapper } from '@ui'
import { about } from '@/client-data/data/text'

const About = () => {
  return (
    <Wrapper>
      <section
        id="About"
        className={classNames(
          'flex flex-col',
          'border border-green-300',
          'h-screen'
        )}
      >
        <h2>{about.title}</h2>
        {about.description.map((item, idx) => {
          return <p key={`${item}-${idx}`}>{item}</p>
        })}
      </section>
    </Wrapper>
  )
}

export default About
