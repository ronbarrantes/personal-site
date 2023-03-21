import classNames from 'classnames'

import { Wrapper } from '@ui'
import { about } from '@/client-data/data/text'

const About = () => {
  return (
    <section id="About">
      <Wrapper
        className={classNames(
          'flex flex-col justify-center gap-2 p-10'

          // 'border border-purple-300',
        )}
      >
        <h2 className="text-3xl font-semibold">{about.title}</h2>
        {about.description.map((item, idx) => {
          return <p key={`${item}-${idx}`}>{item}</p>
        })}
      </Wrapper>
    </section>
  )
}

export default About
