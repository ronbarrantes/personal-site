export function isIndexInArrayRange <T>(idx: number, arr: T[]): boolean {
  return idx >= 0 && idx < arr.length
}

export const randNumber = (limit = 0) => Math.floor(Math.random() * limit)

export const getUrlName = (url: string) => url.split('//')[1]

export const joinTagsArr = (itemArr: string[], separator = ', ') => {
  let itemString = ''

  if(itemArr && typeof itemArr !== 'string')
    itemString = itemArr.join(separator)

  return itemString
}
