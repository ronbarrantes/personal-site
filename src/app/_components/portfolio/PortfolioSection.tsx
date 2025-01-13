import { Portfolio } from '@/app/_components/portfolio/portfolio/Portfolio'
import { portfolioItems, portfolioText } from '@/client-data/data/text'
import { Container } from '@/ui'
import { ItemList } from './portfolio/ItemList'

const PortfolioSection = () => {
  return (
    <section id="Portfolio">
      <Container className="!md:px-6 !px-0">
        <Container.Title text={portfolioText.title} className="px-6 md:px-16" />
        <Container.Description
          text={portfolioText.description}
          className="px-6 md:px-16"
        />
        <div className="flex items-center justify-center ">
          <Portfolio items={portfolioItems}>
            <ItemList />
          </Portfolio>
        </div>
      </Container>
    </section>
  )
}

export default PortfolioSection
