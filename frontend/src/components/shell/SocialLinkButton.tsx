import { Icon } from "@/components/icon";
import type { Link } from "@/lib/types";

type SocialLinkButtonProps = {
  link: Link;
  className: string;
  iconClassName?: string;
};

export const SocialLinkButton = ({
  link,
  className,
  iconClassName,
}: SocialLinkButtonProps) => {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Icon name={link.label as "github"} className={iconClassName} />
      {link.label.toUpperCase()}
    </a>
  );
};
