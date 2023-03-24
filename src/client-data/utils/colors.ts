export const hexToRGB = (hex: string, asArray?: boolean) => {
  if (hex.length === 4) {
    hex = hex.replace(/#([0-9a-f])([0-9a-f])([0-9a-f])/i, '#$1$1$2$2$3$3')
  }

  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  if (asArray) return [r, g, b]
  return `${r}, ${g}, ${b}`
}

export const brightnessFormula = (color: number[]): number =>
  Math.sqrt(
    color[0] * color[0] * 0.241 +
      color[0] * color[0] * 0.691 +
      color[0] * color[0] * 0.068
  )

export const isColorTooDark = (colorString: string): boolean => {
  if (colorString.length !== 3 && colorString.length !== 6)
    throw new Error('Not the right size for a color')

  let hex = colorString.split('')
  if (hex.length === 3) hex = hex.map((val) => val + val)
  else {
    const newHex = []
    for (let i = 0; i < hex.length; i += 2) {
      newHex.push(hex[i] + hex[i + 1])
    }
    hex = newHex
  }
  const dec = hex.map((val) => parseInt(val, 16))
  return brightnessFormula(dec) < 130
}

const closestColors = [
  {
    input: '#000000',
    array: ['#ffffff', '#000000', '#ff0000'],
    output: '#000000',
  },
  {
    input: '#ffffff',
    array: ['#ffffff', '#000000', '#ff0000'],
    output: '#ffffff',
  },
  {
    input: '#e60f0f',
    array: ['#ffffff', '#000000', '#ff0000'],
    output: '#ff0000',
  },
  {
    input: '#15f200',
    array: ['#ffffff', '#000000', '#00ff00'],
    output: '#00ff00',
  },
]

//distance = sqrt((r2-r1)^2 + (g2-g1)^2 + (b2-b1)^2)
// weighed distance = d = sqrt(((r2-r1)*0.3)^2 + ((g2-g1)*0.59)^2 + ((b2-b1)*0.11)^2)

const closestColor = (color: string, colors: string[]) => {
  const colorRGB = hexToRGB(color, true) as number[]

  const distanceList = colors.map((c) => {
    const currColor = hexToRGB(c, true) as number[]

    return Math.sqrt(
      Math.pow((currColor[0] - colorRGB[0]) * 0.3, 2) +
        Math.pow((currColor[1] - colorRGB[1]) * 0.59, 2) +
        Math.pow((currColor[2] - colorRGB[2]) * 0.11, 2)
    )
  })

  const closestColorIndex = distanceList.indexOf(Math.min(...distanceList))

  return colors[closestColorIndex]
}

closestColors.forEach((test, idx) => {
  const result = closestColor(test.input, test.array)

  if (result !== test.output) {
    console.log('Failed test', idx, test)
  }

  console.log('Passed test', idx, [test.input, result])
})
