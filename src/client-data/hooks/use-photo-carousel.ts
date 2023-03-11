import { useReducer } from 'react'

import { isIndexInArrayRange } from '../utils/basic'

type ActionType =
	| { type: 'INCREMENT' }
	| { type: 'DECREMENT' }
	| { type: 'CHOOSE_INDEX', idx: number }

export const usePhotoCarousel = (images: string[]) => {
  const imageReducer = (state: number, action: ActionType) => {
    switch (action.type) {
      case 'INCREMENT':
        return state = state + 1
      case 'DECREMENT':
        return state = state - 1
      case 'CHOOSE_INDEX':
        return action.idx
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(imageReducer, 0)

  const choose = (idx: number) => dispatch({ type: 'CHOOSE_INDEX', idx })

  const next = () => {
    if(isIndexInArrayRange(state + 1, images))
      dispatch({ type: 'INCREMENT' })
    else
      choose(0)
  }

  const prev = () => {
    if(isIndexInArrayRange(state - 1, images))
      dispatch({ type: 'DECREMENT' })
    else{
      choose(images.length - 1)
    }
  }

  return {
    idx: state,
    currImage: images[state],
    prev,
    next,
  }
}