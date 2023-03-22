import Image from 'next/image'

import classNames from 'classnames'

import { Container } from '@ui'
import { about } from '@/client-data/data/text'

const About = () => {
  return (
    <section id="About">
      <Container title={about.title}>
        <div className="mx-auto flex flex-col items-center gap-10 md:w-11/12 md:flex-row  lg:w-9/12">
          <Image
            src="/assets/img/ron.jpg"
            alt={`Ron's picture`}
            width={200}
            height={200}
            className={classNames(
              'w-4/6 rounded-full sm:w-3/6  md:w-64',
              'filter',
              'hue-rotate-90'
            )}
          />
          <div className="flex flex-col gap-2">
            {about.description.map((item, idx) => {
              return <p key={`${item}-${idx}`}>{item}</p>
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About
