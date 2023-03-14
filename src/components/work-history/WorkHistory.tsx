import classNames from 'classnames'
import { Display as WhDisplay } from './work-history-display/Display'
import { experienceItems } from '@/client-data/data/text'

const WorkHistory = () => {
  return (
    <section
      id="Work History"
      className={classNames(
        'flex flex-col items-center justify-center',
        'border border-purple-300',
        // ' h-screen',
      )}
    >
      <h2>Work History</h2>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center"></div>
      </div>

      <WhDisplay items={experienceItems}>
        <WhDisplay.Nav />
        <WhDisplay.Item />
      </WhDisplay>
    </section>
  )
}

export default WorkHistory

// gonna have a bunch of balls as a menu
// there will be some cards
// gotta have some state