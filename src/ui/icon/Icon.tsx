import { IconsLisType } from './icons'

interface IconProps {
  name: IconsLisType['name']
}

export const Icon = ({ name }: IconProps) => {
  console.log('NAME', name)
  return <div>{name}</div>
}
