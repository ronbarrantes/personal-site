import useWorkHistoryContext from './WorkHistoryContext'

export const Nav = () => {
  const { workHistory, index, setIndex } = useWorkHistoryContext()

  return (
    <nav>
      <ul>
        {workHistory.map((item, idx) => (
          <li key={`${item.employer}-${idx}`}>{item.employer}</li>
        ))}
      </ul>
    </nav>
  )
}
