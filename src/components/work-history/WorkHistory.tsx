// import classNames from 'classnames'

import { Experience } from '@components/work-history/experience/Experience'
import { experienceItems } from '@/client-data/data/text'
import { workHistoryText } from '@/client-data/data/text'
import { Container } from '@/ui'

const WorkHistory = () => {
  return (
    <section id="Work History">
      <Container
        title={workHistoryText.title}
        description={workHistoryText.description}
        className="flex flex-col justify-center gap-2 p-10"
      >
        <div className="flex items-center justify-center">
          <Experience items={experienceItems}>
            <Experience.Nav />
            <Experience.ItemDisplay />
          </Experience>
        </div>
      </Container>
    </section>
  )
}

export default WorkHistory
