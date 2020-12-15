import * as utils from '../utils'

const footer = document.createElement('footer')
const github = utils.createElement('a', 'github')
const linkedIn = utils.createElement('a', 'linkedIn')
const email = utils.createElement('a', 'email')
const tsBoilerplate = utils.createElement('a', 'ts-boilerplate')

github.href = 'https://github.com/ronbarrantes'
linkedIn.href = 'https://www.linkedin.com/in/ronbarrantes'
email.href = 'mailto:me@ronbarrantes.com'

utils.appendMultiple(footer)(github, linkedIn, email)

export default footer