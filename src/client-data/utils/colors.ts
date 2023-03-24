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

// FIND THE CLOSEST COLOR FROM AN ARRAY OF COLORS

// https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
