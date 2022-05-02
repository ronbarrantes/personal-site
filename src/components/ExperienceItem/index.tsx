import React from 'react'

import './styles.css'
import { IWorkExperience } from '../../constants/text'
import { getUrlName, joinTagsArr } from '../../utils/basic'

interface IExperienceItem {
	item: IWorkExperience;
}

const ExperienceItem = ({ item }: IExperienceItem) => {
  const { employer, jobTitle, startDate, endDate, description, tools, url } = item

  return (
    <li className="experience-item">
      <h3 className="experience-item-employer">{employer}</h3>
      <p className="experience-item-title">{jobTitle}</p>
      {url && <a className="experience-item-url" href={url} target="_blank" rel="noreferrer">{getUrlName(url)}</a>}
      <p className="experience-item-duration">{`${startDate} - ${endDate}`}</p>
      {description.map((item, i) => <p className="experience-item-description" key={`descItem=${i}`}>{item}</p>)}
      <p className="experience-item-tools">Tools: {joinTagsArr(tools)}</p>
    </li>
  )
}

export default ExperienceItem