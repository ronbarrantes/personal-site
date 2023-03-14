import { ReactNode } from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { Arrow } from './Arrow'
import { Content } from './Content'
import { Trigger } from './Trigger'

interface TooltipProps {
  children: ReactNode
  delay: 0
}

export const Tooltip = ({ children, delay }: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider delayDuration={delay}>
      <TooltipPrimitive.Root>{children}</TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

Tooltip.Arrow = Arrow
Tooltip.Content = Content
Tooltip.Trigger = Trigger
