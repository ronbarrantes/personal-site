import classNames from 'classnames'

interface WrapperProps {
  children: React.ReactNode
  className?: string
}

export const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div className={classNames('mx-auto max-w-7xl', className)}>{children}</div>
  )
}
