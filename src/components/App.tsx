import * as React from 'react'

type MyApp = {
  hello?: string;
}

const App: React.FC<MyApp> = (props) => (
  <React.Fragment>
    {`hello ${props.hello}`}
  </React.Fragment>
)

export default App