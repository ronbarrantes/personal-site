import React from 'react'

import ReactDOM from 'react-dom'

import Wrapper from '../Wrapper'

const ContactModal = ({ handleClick } : { handleClick: () => void }) => {
  return ReactDOM.createPortal (
    <Wrapper cssClass='modal-wrapper'>
      <div><button onClick={handleClick}>hello</button></div>
    </Wrapper>, document.getElementById('modal') as Element,
  )
}

export default ContactModal