import { Experience } from '@/app/_components/work-history/experience/Experience'
import { experienceItems, workHistoryText } from '@/client-data/data/text'
import { Container } from '@/ui'
import { ItemList } from './experience/ItemList'

const WorkHistory = () => {
  return (
    <section id="Work History">
      <Container className="!md:px-6 !px-0">
        <Container.Title
          text={workHistoryText.title}
          className="px-6 md:px-16"
        />
        <Container.Description
          text={workHistoryText.description}
          className="px-6 md:px-16"
        />
        <div className="flex items-center justify-center ">
          <Experience items={experienceItems}>
            <ItemList />
          </Experience>
        </div>
      </Container>
    </section>
  )
}

export default WorkHistory
