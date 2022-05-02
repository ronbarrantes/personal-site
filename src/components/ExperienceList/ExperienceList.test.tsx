import React from 'react'

import { screen, render, cleanup } from '@testing-library/react'

import '@testing-library/jest-dom'
import { experience } from '../../constants/text'

import ExperienceList from '.'

describe('ExperienceList component', () => {
  afterEach(cleanup)

  it('Should get the number of experiences', () => {
    render(<ExperienceList />)
    expect(screen.getAllByRole('listitem').length).toBe(experience.items.length)
  })

  it('Will check each heading of the experience', () => {
    render(<ExperienceList />)
    const headings = screen.getAllByRole('heading')
    expect(headings).toHaveLength(experience.items.length)

    headings.forEach(((heading, i) => {
      expect(heading).toHaveTextContent(experience.items[i].employer)
    }))
  })
})