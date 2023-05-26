import { Portfolio } from '@components/portfolio/portfolio/Portfolio'
import { experienceItems, portfolioText } from '@/client-data/data/text'
import { Container } from '@/ui'

const PortfolioSection = () => {
  return (
    <section id="Work History">
      <Container className="!md:px-6 !px-0">
        <Container.Title text={portfolioText.title} className="px-6 md:px-16" />
        <Container.Description
          text={portfolioText.description}
          className="px-6 md:px-16"
        />
        <div className="flex items-center justify-center ">
          <Portfolio items={experienceItems}>
            <Portfolio.ItemList />
          </Portfolio>
        </div>
      </Container>
    </section>
  )
}

export default PortfolioSection