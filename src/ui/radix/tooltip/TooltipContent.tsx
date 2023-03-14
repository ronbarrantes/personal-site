import * as TooltipPrimitive from '@radix-ui/react-tooltip'

interface TooltipContentProps {
  children: React.ReactNode
  className?: string
  side?: TooltipPrimitive.TooltipContentProps['side']
  sideOffset?: TooltipPrimitive.TooltipContentProps['sideOffset']
}

export const TooltipContent = ({
  children,
  className,
  sideOffset = 5,
  side = 'top',
}: TooltipContentProps) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        className={className}
        side={side}
        sideOffset={sideOffset}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}
