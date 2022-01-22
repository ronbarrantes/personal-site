import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import ExperienceList from '.'
import { experience } from '../../constants/text'

describe('ExperienceList component', () => {
  afterEach(cleanup)

  it('Should get the number of experiences', () => {
    const { getAllByRole } = render(<ExperienceList />)
    expect(getAllByRole('listitem').length).toBe(experience.items.length)
  })

  it('Will check each heading of the experience', () => {
    const { getByRole } = render(<ExperienceList />)
    experience.items.forEach((heading => {
      expect(getByRole('heading', { name: heading.employer })).toBeInTheDocument()
    }))
  })
})