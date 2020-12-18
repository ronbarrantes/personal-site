import 'reset-css'
import './styles/main.scss'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/app'

const container = document.createElement('div')
container.className = 'container'

const rootElement = document.createElement('div')
rootElement.className = 'root'
document.body.appendChild(rootElement)

ReactDOM.render(<App/>, rootElement)