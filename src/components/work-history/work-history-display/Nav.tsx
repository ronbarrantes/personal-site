import useWorkHistoryContext from './WorkHistoryContext'
import { Tooltip } from '@ui'
import classNames from 'classnames'

export const Nav = () => {
  const { workHistory, index, setIndex } = useWorkHistoryContext()

  return (
    <nav className="border border-red-400">
      <ul className="flex flex-col gap-6">
        {workHistory.map((item, idx) => (
          <li key={`${item.employer}-${idx}`}>
            <Tooltip>
              <Tooltip.Trigger asChild>
                <button
                  aria-label={item.employer}
                  className={classNames('w-5 h-5 rounded-full bg-purple-500')}
                  onClick={() => setIndex(idx)}
                />
              </Tooltip.Trigger>
              <Tooltip.Content
                side="right"
                className="bg-neutral-800 text-neutral-100 rounded-md p-4 py-1 flex"
              >
                <Tooltip.Arrow className="fill-neutral-800" />
                <span>{item.employer}</span>
              </Tooltip.Content>
            </Tooltip>
          </li>
        ))}
      </ul>
    </nav>
  )
}
