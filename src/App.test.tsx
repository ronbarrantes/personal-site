import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './components/App'

describe('App component', () => {
  it('Should display a hello to myself', () => {
    const {  getByText} = render(<App name='Ron' />)
    expect(getByText('Hello Ron')).toBeInTheDocument()
  })
})