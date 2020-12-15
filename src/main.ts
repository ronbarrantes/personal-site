import 'reset-css'
import './styles/main.scss'
import * as utils from './utils'

import header from './components/header'
import footer from './components/footer'
import content from './components/content'

const container = document.createElement('div')
container.className = 'container'

const root = document.createElement('root')

utils.appendMultiple(container)(header, content, footer)
document.body.appendChild(container)
document.body.appendChild(root)