import type { AppProps } from 'next/app'

import Header from '@/components/app/header/Header'
import Footer from '@/components/footer/Footer'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
