import type { AppProps } from 'next/app'

import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { Nav } from '@/components/nav/Nav'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header>
        <Nav />
      </Header>
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
