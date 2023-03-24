/**
 * A function that takes a 3-character hex string (with the leading "#")
 * as input and returns a 6-character hex string (with the leading "#").
 *
 * @param {string} hex - The 4-character hex string to convert to 6-character.
 * @returns {string} The 6-character hex string.
 * @throws {Error} If the input is not 4 characters.
 */

export const convertTo6DigitHex = (hex: string): string => {
  if (hex.length !== 4) throw new Error('Not the right size for a color')
  return hex.replace(/#([0-9a-f])([0-9a-f])([0-9a-f])/i, '#$1$1$2$2$3$3')
}

/**
 * A function that takes an array of three numbers representing RGB values as
 * input and returns a single number representing the perceived brightness of
 * the color according to a formula that weighs the individual RGB components.
 *
 * @param {number[]} color - An array of three numbers representing the RGB values of the color.
 * @returns {number} The perceived brightness of the color.
 */

export const brightnessFormula = (color: number[]): number => {
  return Math.sqrt(
    color[0] * color[0] * 0.241 +
      color[0] * color[0] * 0.691 +
      color[0] * color[0] * 0.068
  )
}

/**
 * A function that takes a 3- or 6-character hex string as input
 * (with the leading "#") and returns an array of three numbers representing the
 * corresponding RGB values.
 *
 * @param {string} hex - The hex string to convert to RGB values.
 * @returns {number[]} An array of three numbers representing the RGB values of the color.
 * @throws {Error} If the input is not a valid hex color.
 */
export const hexToRGB = (hex: string): number[] => {
  if (hex.length !== 4 && hex.length !== 7)
    throw new Error('Not a valid hex color, please include the "#"')

  if (hex.length === 4) {
    hex = convertTo6DigitHex(hex)
  }

  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  return [r, g, b]
}

/**
 * A function that takes a color in hex format as input
 * and returns a boolean indicating whether the color is considered dark or not
 * based on its perceived brightness, with a threshold of 130 as the cut-off point.
 *
 * @param {string} colorString - The hex color to check for darkness.
 * @returns {boolean} `true` if the color is considered dark; `false` otherwise.
 */
export const isColorDark = (colorString: string): boolean => {
  const dec = hexToRGB(colorString)
  return brightnessFormula(dec) < 130
}

/**
 * A function that takes a color in hex format and an
 * array of hex color input, and returns the hex color string in the
 * array that is closest to the input color in perceived brightness.
 *
 * @param {string} color - The hex string representing the color to compare to.
 * @param {string[]} colors - An array of hex color strings to compare to.
 * @returns {string} The hex color string in the array that is closest in perceived brightness to the input color.
 */
export const closestColor = (color: string, colors: string[]): string => {
  const colorRGB = hexToRGB(color)

  const distanceList = colors.map((color) => {
    const currColor = hexToRGB(color)
    return Math.sqrt(
      Math.pow((currColor[0] - colorRGB[0]) * 0.3, 2) +
        Math.pow((currColor[1] - colorRGB[1]) * 0.59, 2) +
        Math.pow((currColor[2] - colorRGB[2]) * 0.11, 2)
    )
  })

  const closestColorIndex = distanceList.indexOf(Math.min(...distanceList))
  return colors[closestColorIndex]
}
