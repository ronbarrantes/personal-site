import { ExternalLinkIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'

import { Icon, iconsLisFiles, Tooltip } from '@ui'
import { TLink as Link } from '@/types'
import usePortfolioContext from './PortfolioContext'

interface ItemProps {
  index: number
  className?: string
}

const PortfolioLink = ({
  link,
  icon,
}: {
  icon: React.ReactNode
  link: string | Link
}) => {
  const linkInfo =
    typeof link === 'string'
      ? {
          href: link,
          label: link.split('//')[1],
        }
      : link

  return (
    <div className="flex items-center gap-4 mb-2">
      <span>{icon}</span>
      <a
        href={`${linkInfo.href}`}
        target="_blank"
        className="text-purple-200 underline hover:no-underline"
      >
        {linkInfo.label}
      </a>
    </div>
  )
}

export const Item = ({ index, className }: ItemProps) => {
  const { portfolioItems } = usePortfolioContext()

  // const dateText = portfolioItems[index].endDate
  //   ? `${portfolioItems[index].startDate} - ${portfolioItems[index].endDate}`
  //   : `${portfolioItems[index].startDate} - Present`

  const { name, description, github, tools, link } = portfolioItems[index]
  const isBigName = name.length > 25

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
              isBigName ? 'text-2xl md:text-3xl lg:text-2xl' : 'text-3xl'
            )}
          >
            {name}
          </h3>
        </div>

        <div className="flex flex-col gap-2 font-light">
          {description.map((p, idx) => {
            return <p key={idx}>{p}</p>
          })}
        </div>
      </div>

      <ul>
        {link && (
          <li>
            <PortfolioLink
              link={link}
              icon={<ExternalLinkIcon className="w-6 h-6" />}
            />
          </li>
        )}
        {github && (
          <li>
            <PortfolioLink
              link={github}
              icon={<GitHubLogoIcon className="w-6 h-6" />}
            />
          </li>
        )}
      </ul>

      <div className="flex flex-col gap-3 md:px-10">
        <p className="italic font-semibold">Tools Used:</p>
        <div className="flex flex-wrap gap-5">
          {tools.map((tool, idx) => (
            <Tooltip key={`${tool}-${idx}`}>
              <Tooltip.Trigger>
                <Icon className="h-5 rounded-sm" name={tool} />
              </Tooltip.Trigger>
              <Tooltip.Content
                side="bottom"
                className="shadow-sm bg-neutral-900"
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
