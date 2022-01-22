import React from 'react'
import './styles.css'

import ExperienceItems from '../ExperienceList'
import Wrapper from '../Wrapper'

// TODO: 4 give some nice styles to the experience

const Experience = () => (
  <Wrapper cssClass="experience-wrapper">
    <div id='experience' className='experience'>
      <h2>Experience</h2>
      <p>{`Just in case, here is where I've worked on`}</p>
      <ExperienceItems />
    </div>
  </Wrapper>
)

export default Experience