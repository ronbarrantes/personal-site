import classNames from 'classnames'

import { Heading } from '../heading/Heading'

interface ContainerProps {
  className?: string
  children: React.ReactNode
}

interface ContainerTitleProps {
  text: string
  className?: string
  main?: boolean
}

const ContainerTitle = ({ main, text, className }: ContainerTitleProps) => {
  return (
    <Heading
      type={main ? 'h1' : 'h2'}
      className={classNames('text-3xl font-semibold', className)}
    >
      {text}
    </Heading>
  )
}

interface ContainerDescriptionProps {
  text: string | string[]
  className?: string
}

const ContainerDescription = ({
  text,
  className,
}: ContainerDescriptionProps) => {
  return Array.isArray(text) ? (
    <>
      {text.map((item, idx) => {
        return (
          <p className={classNames(className)} key={`${item}-${idx}`}>
            {item}
          </p>
        )
      })}
    </>
  ) : (
    <p className={classNames(className)}>{text}</p>
  )
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={classNames(
        'mx-auto flex max-w-7xl flex-col gap-2 px-6 py-10',
        className
      )}
    >
      {children}
    </div>
  )
}

Container.Title = ContainerTitle
Container.Description = ContainerDescription
