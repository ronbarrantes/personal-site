import React, { useState } from 'react'

import './styles.css'
import { useEmailFormSubmit } from '../../hooks/useEmailFormSubmit'
import Wrapper from '../Wrapper'
// import ContactModal from '../ContactModal'

// TODO Start adding styles

const emailID = '917c268134d58bcf58c4a4010c470a43_FAKE'

const Contact = () => {
  const { handleChange, handleSubmit, formMessage } = useEmailFormSubmit(emailID)
  const [ isModalActive, setIsModalActive ] = useState(false)
	// TODO: Add a flash message to the success or failure email

	// TODO: split the usePortfolio into usePortfolio and useModal
  return (
    <Wrapper cssClass="contact-wrapper">
      <div id='contact' className='contact'>
        <div>
          <h2>Contact</h2>
          <p>If you wish to contact me please do so with this form</p>
        </div>
        <form className='contact-form' onSubmit={handleSubmit}>
          <input
            className='contact-input contact-name'
            id='name'
            type="text"
            placeholder="Name"
            value={formMessage.name}
            onChange={handleChange}
            required={true}
          />
          <input
            className='contact-input contact-email'
            id='email'
            type="email"
            placeholder="Email"
            value={formMessage.email}
            onChange={handleChange}
            required={true}
          />
          <textarea
            id='message'
            className="contact-input contact-body"
            placeholder="Enter message here...."
            value={formMessage.message}
            onChange={handleChange}
            required={true}
            rows={5}
          />
          <button className='contact-button' type="submit">Send</button>
        </form>
      </div>

      <button onClick={() => {
        setIsModalActive(!isModalActive)
        console.log(isModalActive)
      }}>click me</button>

      {/* {isModalActive && <ContactModal handleClick={() => {
				setIsModalActive(false)
			}} />} */}
    </Wrapper>
  )
}

export default Contact