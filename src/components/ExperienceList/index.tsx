import React from 'react'

import { experience } from '../../constants/text'
import ExperienceItem from '../ExperienceItem'

const ExperienceList = () => (
  <ul>
    {experience.items.map(
      (item, i) => <ExperienceItem item={item} key={`${item}-${i}`} />,
    )}
  </ul>
)

export default ExperienceList