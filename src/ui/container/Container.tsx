import classNames from 'classnames'

interface ContainerProps {
  className?: string
  children: React.ReactNode
}

interface ContainerTitleProps {
  text: string
  className?: string
}

const ContainerTitle = ({ text, className }: ContainerTitleProps) => {
  return (
    <h2 className={classNames('text-3xl font-semibold', className)}>{text}</h2>
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
