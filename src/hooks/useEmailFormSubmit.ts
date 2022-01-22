import { useState } from 'react'

interface IInfoResponse {
	message: string;
	success: string;
}

interface IFormMessage {
	name: string;
	email: string;
	message: string;
}

/**
 * Provides an easy way to send an email by utilizing [FormSubmit](https://formsubmit.co/)
 * @param emailId - string Either the email or Randomly generated id provided by FormSubmit
 * @returns handleChange, handleSubmit, formMessage, infoResponse, cleanInfoResponse,
 */
export const useEmailFormSubmit = (emailId: string) => {
  const [infoResponse, setInfoResponse] = useState<IInfoResponse>({
    message: '',
    success: '',
  })

  const [formMessage, setFormMessage] = useState<IFormMessage>({
    name: '',
    email: '',
    message: '',
  })

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    console.log(e.target.value)
    setFormMessage({ ...formMessage, [e.target.id]: e.target.value })
  }

  const cleanInfoResponse = () => {
    setInfoResponse({ message: '', success: '' })
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement>	= async (e) => {
    e.preventDefault()
    console.log(formMessage) // PLEASE DELETE
    const res = await fetch(`https://formsubmit.co/ajax/${emailId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: formMessage.name,
        email: formMessage.email,
        message: formMessage.message,
      }),
    })

    const data: IInfoResponse = await res.json()
    setInfoResponse({ message: data.message, success: data.success })

    try {
      if(data.success !== 'true')
        throw new Error(data.message)
      console.log('SUCCESS!', data.message)
    } catch (err: Error | unknown) {
      console.error('ERROR!', (err as Error).message)
    }

    setFormMessage({ ...formMessage, message: '' })
  }

  return {
    handleChange,
    handleSubmit,
    formMessage,
    infoResponse,
    cleanInfoResponse,
  }
}