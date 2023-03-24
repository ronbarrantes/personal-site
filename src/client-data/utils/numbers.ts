export const closestNumber = (num: number, numbers: number[]): number => {
  const distances = numbers.map((currNum) => Math.abs(currNum - num))
  const closestNumberIndex = distances.indexOf(Math.min(...distances))
  return numbers[closestNumberIndex]
}
