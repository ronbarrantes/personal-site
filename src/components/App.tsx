import * as React from 'react'
import Container from './container'
import Footer from './footer'
import Header from './header'

const App: React.FC = () => (
  <React.Fragment>
    <Header />
    <Container />
    <Footer />
  </React.Fragment>
)

export default App