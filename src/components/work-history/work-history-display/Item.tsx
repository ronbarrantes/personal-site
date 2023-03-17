import { Icon, Tooltip } from '@ui'
import useWorkHistoryContext from './WorkHistoryContext'

export const Item = () => {
  const { index, workHistory } = useWorkHistoryContext()

  return (
    <div className="flex flex-col gap-4">
      <h3>{workHistory[index].employer}</h3>
      <p>{workHistory[index].jobTitle}</p>

      <div className="flex flex-col gap-2">
        {workHistory[index].description.map((p, idx) => {
          return <p key={idx}>{p}</p>
        })}
      </div>
      <div className="flex flex-wrap gap-5">
        {workHistory[index].tools.map((tool, idx) => (
          <Tooltip key={`${tool}-${idx}`}>
            <Tooltip.Trigger>
              <Icon name={tool} />
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom">
              <span>{tool}</span>
            </Tooltip.Content>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
