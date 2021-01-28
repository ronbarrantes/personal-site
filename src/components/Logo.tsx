import * as React from 'react'
import { ReactSVG } from 'react-svg'
import { css } from '@emotion/css'

const logoStyle = css`
  width: 100px;
  border: 1px dashed orange;
`

const Logo = (): JSX.Element => (
  <ReactSVG src="./public/assets/sigLogo.svg" className={logoStyle} />
)

export default Logo
