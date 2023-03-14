import classNames from 'classnames'

const About = () => {
  return (
    <section
      id="About"
      className={classNames(
        'flex flex-col items-center justify-center',
        'border border-green-300'
        // ' h-screen',
      )}
    >
      <h2>About</h2>
    </section>
  )
}

export default About
