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

  const isBigJobTitle = workHistory[index].jobTitle.length > 25

  return (
    <div
      className={classNames(
        'flex flex-col justify-between gap-4 rounded-lg bg-neutral-900 bg-gradient-to-br from-neutral-800 to-purple-900 p-10 text-neutral-100 shadow-sm',
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="gap-3">
          <h3
            className={classNames(
              'mb-1 w-fit bg-gradient-to-br from-purple-300 to-purple-200 bg-clip-text font-extrabold text-transparent',
              isBigJobTitle ? 'text-2xl md:text-3xl lg:text-2xl' : 'text-3xl'
            )}
          >
            {workHistory[index].jobTitle}
          </h3>
          <h4 className="text-lg">{workHistory[index].employer}</h4>
          <div className="font-light italic text-purple-200">{dateText}</div>
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
