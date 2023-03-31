const headingType = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

type HeadingProps = {
  type: (typeof headingType)[number]
}

export const Heading = ({}: HeadingProps) => {
  return <></>
}
