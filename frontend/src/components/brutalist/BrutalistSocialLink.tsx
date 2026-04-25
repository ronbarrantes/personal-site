import { Icon } from "@/components/icon";
import type { Link } from "@/lib/types";

type BrutalistSocialLinkProps = {
  link: Link;
  className: string;
  iconClassName?: string;
};

export const BrutalistSocialLink = ({
  link,
  className,
  iconClassName,
}: BrutalistSocialLinkProps) => {
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
