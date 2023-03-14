import { ReactNode } from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { TooltipArrow } from './TooltipArrow'
import { TooltipContent } from './TooltipContent'
import { TooltipTrigger } from './TooltipTrigger'

interface TooltipProps {
  children: ReactNode
  delay?: number
}

export const Tooltip = ({ children, delay = 0 }: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider delayDuration={delay}>
      <TooltipPrimitive.Root>{children}</TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

Tooltip.Arrow = TooltipArrow
Tooltip.Content = TooltipContent
Tooltip.Trigger = TooltipTrigger
