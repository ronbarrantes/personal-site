import * as TooltipPrimitive from '@radix-ui/react-tooltip'

interface TooltipTriggerProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

export const Trigger = ({
  children,
  className,
  asChild,
}: TooltipTriggerProps) => {
  return (
    <TooltipPrimitive.Trigger className={className} asChild={asChild}>
      {children}
    </TooltipPrimitive.Trigger>
  )
}
