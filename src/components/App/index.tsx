import React from 'react'

import { hot } from 'react-hot-loader/root'
import './styles.css'

import About from '../About'
// import Contact from '../Contact'
import Experience from '../Experience'
import Footer from '../Footer'
import Header from '../Header'
// import Portfolio from '../Portfolio'
// import { PortfolioProvider } from '../../hooks/usePortfolio'

function App() {
  return (
    <div className="App">
      <Header />
      <About />
      {/* <PortfolioProvider>
        <Portfolio />
      </PortfolioProvider> */}
      <Experience />
      {/* <Contact /> */}
      <Footer />
    </div>
  )
}

export default hot(App)
