import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Logo } from '@/components/branding/Logo'
import classNames from 'classnames'
import { useState } from 'react'
import WorkHistory from '@/components/work-history/WorkHistory'
import About from '@/components/about/About'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

// const inter = Inter({ subsets: ['latin'] })

// const arr = new Array(9).fill('').map((_, i) => `bg-purple-${i + 1}00`)

export default function Home() {
  // const [sat, setSat] = useState<number>(0)
  // const [bal, setBal] = useState<number>(0)

  // console.log(arr)

  return (
    <>
      <Head>
        <title>{`Ron's site 😊`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <About />
        <WorkHistory />
        <Footer />

        {/* <div className="flex w-fit border border-red-500 bg-gradient-to-r from-purple-400 to-green-600 bg-clip-text text-8xl font-extrabold text-transparent">
          Tailwind CSS
        </div> */}
      </main>
    </>
  )
}
