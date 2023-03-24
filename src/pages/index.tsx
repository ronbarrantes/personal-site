import { Inter } from 'next/font/google'
import Head from 'next/head'

import About from '@/components/about/About'
import WorkHistory from '@/components/work-history/WorkHistory'

export default function Home() {
  return (
    <>
      <Head>
        <title>{`Ron's site 😊`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <p className="bg-[#e60f0f]">Hello</p>
        <About />
        <WorkHistory />
      </main>
    </>
  )
}
