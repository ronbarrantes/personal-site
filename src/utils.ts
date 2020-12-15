export interface AppendMultiple {
  (parent: HTMLElement): (...children: HTMLElement[]) => void;
}

export interface BoardState {
  value: number
  isEnabled: boolean
}

/**
 * Creates a random number
 * @param num the number, default 255
 */
export const randomNumber = (num = 255): number => Math.floor(Math.random() * num)

/**
 * Creates a random number in a range (inclusive)
 * @param from starting random number position
 * @param to end random number position
 * @returns number
 */
export const randomNumberRange = (from: number, to: number): number => from + randomNumber(to - from + 1)

/**
 * Creates a random rgb color
 * @returns string rgb
 */
export const randomColor = (): string =>
  `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`

/**
 * Appends multiple html elements to a parent html element
 * @param parent element to add to
 * @param children list of children comma separated
 */
export const appendMultiple: AppendMultiple = (parent) =>
  (...children) => children.forEach(child => parent.appendChild(child))

/**
 * Shuffles and array
 * @param array array to be shuffled
 * @returns shuffled array
 */
export const shuffleArray = (array: number[]): number[] => {
  let currentIndex = array.length, temporaryValue, randomIndex

    // While there remain elements to shuffle...
  while (0 !== currentIndex) {

      // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

      // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

/**
 * Gets a random image from https://picsum.photos/
 * @param width width of the image | default 100px
 * @param height height of the image, if height is not specify width will be used
 * @returns An HTMLElement with a random clickable image
 */
export const randomImage = (width?: number, height?: number): HTMLImageElement => {
  width = width || 100
  height = height || width

  const url = `https://picsum.photos/${width}/${height}`
  const image = document.createElement('img')
  image.alt = 'random photo from https://picsum.photos'
  image.src = url

  image.addEventListener('click', e => {
    e.preventDefault()
    image.src = url
  })

  return image
}

/**
 * Initializes a base HTMLElement with a the text content
 * @param element the HTMLElement to be created
 * @param text text of the element
 */
export const createElement = (element: string, text?: string): HTMLElement | HTMLAnchorElement => {
  let el
  if (element === 'a')
    el = document.createElement(element) as HTMLAnchorElement
  else
    el = document.createElement(element)

  if(text)
    el.textContent = text

  return el
}