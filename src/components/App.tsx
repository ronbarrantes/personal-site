import * as React from 'react'

type AppType = {
  hello?: string;
}

const App: React.FC<AppType> = (props) => (
  <React.Fragment>
    {`hello ${props.hello}`}
  </React.Fragment>
)

export default App