import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import { hot } from 'react-hot-loader/root'

// const App = ({ name }: {name?: string}) => <div>Hello {name}</div>

const root = document.createElement('root')

root.innerHTML = '<div>hello :)</div>'

ReactDOM.render(<div>Hello world</div>, root)
document.body.appendChild(root)