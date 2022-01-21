import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

const root = document.createElement('root')
document.body.appendChild(root)
ReactDOM.render(<App name="Ron" />, root)