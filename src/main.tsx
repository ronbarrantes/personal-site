import React from 'react'

import ReactDOM from 'react-dom'

import App from './components/App'
import './styles/reset.css'
import './styles/styles.css'

const root = document.createElement('root')
const portalEl = document.createElement('div')
portalEl.id = 'modal'

document.body.appendChild(portalEl)
document.body.appendChild(root)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  , root)