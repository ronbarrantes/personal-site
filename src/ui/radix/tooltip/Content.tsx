import * as TooltipPrimitive from '@radix-ui/react-tooltip'

interface TooltipContentProps {
  children: React.ReactNode
  className?: string
}

export const Content = ({
  children,
  className,
  ...props
}: TooltipContentProps) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content className={className}>
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}
