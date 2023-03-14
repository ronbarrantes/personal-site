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
      <div>
        {workHistory[index].tools.map((tool, idx) => (
          <span key={idx}>{tool}</span>
        ))}
      </div>
    </div>
  )
}
