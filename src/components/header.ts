import * as utils from '../utils'

const header = utils.createElement('header')
const title = utils.createElement('h1', 'Ron Barrantes')
const city = utils.createElement('p', 'Seattle, WA')

utils.appendMultiple(header)(title, city)

export default header