import 'reset-css'
import './styles/main.scss'
import * as utils from './utils'

import header from './components/header'
import content from './components/content'
import footer from './components/footer'

const container = document.createElement('div')
container.className = 'container'

utils.appendMultiple(container)(header, content, footer)
document.body.appendChild(container)
