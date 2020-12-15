import * as utils from '../utils'

const footer = document.createElement('footer')
const github = <HTMLLinkElement>utils.createElement('a', 'github')
const linkedIn = <HTMLAnchorElement>utils.createElement('a', 'linkedIn')
const email = <HTMLAnchorElement>utils.createElement('a', 'email')

github.href = 'https://github.com/ronbarrantes'
linkedIn.href = 'https://www.linkedin.com/in/ronbarrantes'
email.href = 'mailto:me@ronbarrantes.com'

utils.appendMultiple(footer)(github, linkedIn, email)

export default footer