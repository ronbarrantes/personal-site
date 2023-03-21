import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import classNames from 'classnames'

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
        className={classNames('rounded-lg p-3 py-1', className)}
        side={side}
        sideOffset={sideOffset}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}
