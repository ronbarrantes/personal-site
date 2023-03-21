import classNames from 'classnames'

import { experienceItems } from '@/client-data/data/text'
import { workHistoryText } from '@/client-data/data/text'
import { Container } from '@/ui'
import { Display as WhDisplay } from './work-history-display/Display'

const WorkHistory = () => {
  return (
    <section id="Work History">
      <Container
        title={workHistoryText.title}
        description={workHistoryText.description}
        className="flex flex-col justify-center gap-2 p-10"
      >
        <div className="flex items-center justify-center">
          <WhDisplay items={experienceItems}>
            <WhDisplay.Nav />
            <WhDisplay.Item />
          </WhDisplay>
        </div>
      </Container>
    </section>
  )
}

export default WorkHistory
