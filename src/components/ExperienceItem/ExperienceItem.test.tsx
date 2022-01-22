import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import ExperienceItem from '.'
import { experience } from '../../constants/text'
import { getUrlName, joinTagsArr } from '../../utils/basic'

describe('ExperienceItem component', () => {
  afterEach(cleanup)

  it('Should display all the experience items', () => {
    const microsoftItem = experience.items[0]
    const { employer, jobTitle, startDate, endDate, description, tools, url } = microsoftItem
    const { getByText, getByRole } = render(<ExperienceItem item={microsoftItem} />)

    const toolsStr = joinTagsArr(tools)
    const urlName = url ? getUrlName(url) : ''

    const heading = getByRole('heading', { name: employer })
    expect(heading).toBeInTheDocument()
    expect(getByText(jobTitle)).toBeInTheDocument()

    const link = getByRole('link', { name: urlName })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', url)

    expect(getByText(`${startDate} - ${endDate}`)).toBeInTheDocument()
    expect(getByText(`Tools: ${toolsStr}`)).toBeInTheDocument()

    description.forEach(p => {
      expect(getByText(p)).toBeInTheDocument()
    })
  })

  it('Should display most of the experience items except for "URL"', () => {
    const microsoftItem = experience.items[2]
    const { employer, jobTitle, startDate, endDate, description, tools } = microsoftItem
    const { getByText } = render(<ExperienceItem item={microsoftItem} />)

    const toolsStr = joinTagsArr(tools)

    expect(getByText(employer)).toBeInTheDocument()
    expect(getByText(jobTitle)).toBeInTheDocument()

    expect(getByText(`${startDate} - ${endDate}`)).toBeInTheDocument()
    expect(getByText(`Tools: ${toolsStr}`)).toBeInTheDocument()

    description.forEach(p => {
      expect(getByText(p)).toBeInTheDocument()
    })
  })
})