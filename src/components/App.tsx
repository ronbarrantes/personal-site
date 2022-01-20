import React from 'react'
import { hot } from 'react-hot-loader/root'

interface Props {
	name?: string;
}

const App = ({ name }: Props) => {
  const response = name ? name : ''
  return <div>{`Hello ${response}`}</div>
}

export default hot(App)