/* eslint-disable @next/next/no-img-element */
import { iconsLisFiles, IconsLisType } from './icon-types'

interface IconProps {
  className?: string
  name: IconsLisType
}

export const Icon = ({ name, className }: IconProps) => {
  return (
    <img
      className={className}
      src={`/assets/icons-svg/${iconsLisFiles[name].filename}.svg`}
      alt={iconsLisFiles[name].name}
    />
  )
}
