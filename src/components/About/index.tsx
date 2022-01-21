import React from 'react'
import './styles.css'

import Wrapper from '../Wrapper'
import Img from '../Img'
import { about } from '../../constants/text'

const imgs = [
	'/public/self.png'
]

const About = () => (
	<Wrapper cssClass='about-wrapper'>
		<div id='about' className='about'>
			<h2>About</h2>
			<div className="about-card">
				<Img src={imgs[0]} alt='self' className='about-img'/>
				<div className='about-info'>
					{about.description.map((desc, i) => <p key={`about_info_${i}`}>{desc}</p>)}
				</div>
			</div>
		</div>
	</Wrapper>
)

export default About