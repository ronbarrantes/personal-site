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
        className="px-0"
        headerClassName="px-5"
      >
        <div className="flex items-center justify-center ">
          <Experience items={experienceItems}>
            <Experience.ItemList />
          </Experience>
        </div>
      </Container>
    </section>
  )
}

export default WorkHistory
