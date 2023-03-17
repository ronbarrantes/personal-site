/* eslint-disable @next/next/no-img-element */
import { iconsLisFiles, IconsLisType as ListTypes } from './icon-types'

// export { type IconsLisType } from './icon-types'

interface IconProps {
  className?: string
  name: ListTypes
}

export const Icon = ({ name, className }: IconProps) => {
  return (
    <img
      className={className}
      src={`/assets/icons-svg/${name}.svg`}
      alt={iconsLisFiles[name].name}
    />
  )
}
