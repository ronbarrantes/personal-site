import * as utils from '../utils'

const content = document.createElement('div')
const blurb = utils.createElement('p', `I like to code random stuff sometimes`)
const image = utils.randomImage(250, 250)

content.id = 'content'
image.className = 'randomImage'

utils.appendMultiple(content)(image, blurb)

export default content