interface BadgeProps {
  className?: string
  children: React.ReactNode
}

export const Badge = ({ className, children }: BadgeProps) => {
  return <div className={className}>{children}</div>
}
