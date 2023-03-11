const vals = '0123456789abcdef'

const brightnessFormula = (color: number[]): number => Math.sqrt(
  (color[0] * color[0] * .241) +
	(color[0] * color[0] * .691) +
	(color[0] * color[0] * .068),
)

export const fakeColor = (): string => {
  let str = ''
  for(let i = 0; i < 3; i++){
    const randIdx = Math.floor(Math.random() * vals.length)
    str += vals[randIdx]
  }
  return str
}

export const isColorTooDark = (colorString: string): boolean => {
  if(colorString.length !== 3 && colorString.length !== 6)
    throw new Error('Not the right size for a color')
  let hex = colorString.split('')
  if(hex.length === 3)
    hex = hex.map(val => val+val)
  else {
    const newHex = []
    for(let i = 0; i < hex.length; i+=2){
      newHex.push(hex[i]+hex[i+1])
    }
    hex = newHex
  }
  const dec = hex.map(val => parseInt(val, 16))
  return brightnessFormula(dec) < 130
}

export const fakeImage = ({ width = 600, height, text }: {
	width?: number;
	height?: number;
	text?: string;
},
): string => {
  height = height || width
  text = text || ''

  const bgColor = fakeColor()
  const textColor = isColorTooDark(bgColor) ? 'fff' : '000'
  let url = `https://via.placeholder.com/${width}x${height}.png/${bgColor}/${textColor}`

  if(text.length > 0){
    text = text.split(' ').join('+')
    url +=`?text=${text}`
  }

  return url
}

export const fakeImages = ({ amount = 3, width, height, text }:
	{
		amount: number;
		width?: number;
		height?: number;
		text?: string;
	}): string[] => {
  const images = []
  for(let i = 0; i < amount; i++){
    let newText = ''
    if(text)
      newText += `${text}+${i+1}`

    images.push(fakeImage({ width, height, text: newText }))
  }

  return images
}