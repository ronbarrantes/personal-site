import classNames from 'classnames'

interface ContainerProps {
  title?: string
  description?: string
  className?: string | string[]
  children: React.ReactNode
}

export const Container = ({
  title,
  description,
  children,
  className,
}: ContainerProps) => {
  return (
    <div className={classNames('mx-auto max-w-7xl', className)}>
      {title && <h2 className="text-3xl font-semibold">{title}</h2>}
      {description &&
        (Array.isArray(description) ? (
          description.map((item, idx) => {
            return <p key={`${item}-${idx}`}>{item}</p>
          })
        ) : (
          <p>{description}</p>
        ))}
      {children}
    </div>
  )
}
