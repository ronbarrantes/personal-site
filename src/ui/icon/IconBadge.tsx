/* eslint-disable @next/next/no-img-element */
import { iconsLisFiles, IconsLisType } from './icon-types'

interface IconListProps {
  className?: string
  name: IconsLisType
}

export const IconList = ({ name, className }: IconListProps) => {
  return (
    <img
      className={className}
      src={`/assets/icons-svg/${iconsLisFiles[name].filename}.svg`}
      alt={iconsLisFiles[name].name}
    />
  )
}
