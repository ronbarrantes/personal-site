import classNames from 'classnames'

import { Icon, iconsLisFiles, Tooltip } from '@ui'
import useWorkHistoryContext from './WorkHistoryContext'

interface ItemProps {
  index: number
  className?: string
}

export const Item = ({ index, className }: ItemProps) => {
  const { workHistory } = useWorkHistoryContext()

  const dateText = workHistory[index].endDate
    ? `${workHistory[index].startDate} - ${workHistory[index].endDate}`
    : `${workHistory[index].startDate} - Present`

  return (
    <div
      className={classNames(
        'flex flex-col justify-between gap-4 rounded-lg bg-neutral-900 bg-gradient-to-br from-neutral-800 to-purple-900 p-10 text-neutral-100 shadow-sm',
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <h3 className="w-fit bg-gradient-to-br from-purple-300 to-purple-200 bg-clip-text text-3xl font-extrabold text-transparent">
          {workHistory[index].employer}
        </h3>
        <div className="gap-3">
          <p className="text-lg">{workHistory[index].jobTitle}</p>
          <p className="font-light italic text-purple-200">{dateText}</p>
        </div>

        <div className="flex flex-col gap-2 font-light">
          {workHistory[index].description.map((p, idx) => {
            return <p key={idx}>{p}</p>
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 md:px-10">
        <p className="font-semibold italic">Tools Used:</p>
        <div className="flex flex-wrap gap-5">
          {workHistory[index].tools.map((tool, idx) => (
            <Tooltip key={`${tool}-${idx}`}>
              <Tooltip.Trigger>
                <Icon className="h-5 rounded-sm" name={tool} />
              </Tooltip.Trigger>
              <Tooltip.Content
                side="bottom"
                className="bg-neutral-900 shadow-sm"
              >
                <Tooltip.Arrow className="fill-neutral-900" />
                <div>{iconsLisFiles[tool].name}</div>
              </Tooltip.Content>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  )
}
