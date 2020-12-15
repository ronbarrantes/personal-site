import 'reset-css'
import './styles/main.scss'
import * as utils from './utils'

import content from './components/content'
import footer from './components/footer'
import header from './components/header'

const container = document.createElement('div')
container.className = 'container'

const root = document.createElement('root')

utils.appendMultiple(container)(header, content, footer)
document.body.appendChild(container)
document.body.appendChild(root)