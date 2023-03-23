import Image from 'next/image'

import { Container } from '@ui'
import { about } from '@/client-data/data/text'

const About = () => {
  return (
    <section
      id="About"
      className="border border-transparent border-b-neutral-700 bg-neutral-900 bg-gradient-to-tr from-neutral-800 to-neutral-900"
    >
      <Container className="font-light">
        <div className="mx-auto flex flex-col items-center gap-10 md:w-11/12 md:flex-row  lg:w-9/12">
          <Image
            src="/assets/img/ron.jpg"
            alt={`Ron's picture`}
            width={200}
            height={200}
            className="w-4/6 rounded-full border-2 border-neutral-500 sm:w-3/6 md:w-64"
          />
          <div className="flex flex-col gap-2">
            <Container.Title text={about.title} />
            <Container.Description
              text={about.description}
              className="text-sm font-light"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About
