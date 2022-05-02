import React from 'react'

import { render, cleanup } from '@testing-library/react'

import '@testing-library/jest-dom'
import { experience } from '../../constants/text'
import { getUrlName, joinTagsArr } from '../../utils/basic'

import ExperienceItem from '.'

describe('ExperienceItem component', () => {
  afterEach(cleanup)

  experience.items.slice(3).forEach(item => {
    const { employer, jobTitle, startDate, endDate, description, tools, url } = item

    it(`Should test for ${employer} experience item`, () => {
      const { getByText, getByRole } = render(<ExperienceItem item={item} />)

      const toolsStr = joinTagsArr(tools)

      const heading = getByRole('heading', { name: employer })
      expect(heading).toBeInTheDocument()
      expect(getByText(jobTitle)).toBeInTheDocument()

      if(url){
        const urlName = getUrlName(url)
        const link = getByRole('link', { name: urlName })

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', url)
      }

      expect(getByText(`${startDate} - ${endDate}`)).toBeInTheDocument()
      expect(getByText(`Tools: ${toolsStr}`)).toBeInTheDocument()

      description.forEach(p => {
        expect(getByText(p)).toBeInTheDocument()
      })
    })
  })

})