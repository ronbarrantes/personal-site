import * as React from 'react'

import { ReactSVG } from 'react-svg'

const Logo = (): JSX.Element => {
  return (
    <ReactSVG src="./public/assets/sigLogo.svg" className={'logo'}/>
  )
}

export default Logo