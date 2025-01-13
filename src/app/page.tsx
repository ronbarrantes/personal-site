import Head from 'next/head'

import { About } from '@/app/_components/about/About'
import PortfolioSection from '@/app/_components/portfolio/PortfolioSection'
import WorkHistory from '@/app/_components/work-history/WorkHistory'

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <About />
        <PortfolioSection />
        <WorkHistory />
      </main>
    </>
  )
}
