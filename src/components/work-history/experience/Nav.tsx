import classNames from 'classnames'

import { Tooltip } from '@ui'
import useExperience from './ExperienceContext'

export const Nav = () => {
  const { workHistory, setIndex } = useExperience()

  return (
    <nav className="border border-red-400">
      <ul className="flex flex-col gap-6">
        {workHistory.map((item, idx) => (
          <li key={`${item.employer}-${idx}`}>
            <Tooltip>
              <Tooltip.Trigger asChild>
                <button
                  aria-label={item.employer}
                  className={classNames('h-5 w-5 rounded-full bg-purple-500')}
                  onClick={() => setIndex(idx)}
                />
              </Tooltip.Trigger>
              <Tooltip.Content
                side="right"
                className="flex rounded-md bg-neutral-800 p-4 py-1 text-neutral-100"
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
