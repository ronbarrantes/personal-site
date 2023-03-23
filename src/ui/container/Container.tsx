import classNames from 'classnames'

interface ContainerProps {
  title?: string
  description?: string
  className?: string | string[]
  children: React.ReactNode
  isHeader?: boolean
  headerClassName?: string
}

export const Container = ({
  title,
  description,
  children,
  isHeader,
  className,
  headerClassName,
}: ContainerProps) => {
  return (
    <div
      className={classNames(
        'mx-auto max-w-7xl px-5',
        !isHeader && 'flex flex-col gap-2 py-10',
        className
      )}
    >
      {(title || description) && (
        <div className={classNames('flex flex-col gap-2', headerClassName)}>
          {title && <h2 className="text-3xl font-semibold">{title}</h2>}
          {description &&
            (Array.isArray(description) ? (
              description.map((item, idx) => {
                return <p key={`${item}-${idx}`}>{item}</p>
              })
            ) : (
              <p>{description}</p>
            ))}
        </div>
      )}
      {children}
    </div>
  )
}
