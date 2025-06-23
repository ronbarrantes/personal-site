import { useState } from "react";

import classNames from "classnames";
import { NavLink, type NavLinkProps } from "react-router";

import type { IconLink } from "@/lib/types";
import { useLinksStore } from "@/store/use-links";
import { Logo } from "./logo/Logo";
import { Button } from "./ui/button";
import { Icon } from "./icon";
import { ModeToggle } from "./mode-toggle";

type CustomLinkType = {
  to: string;
  pageIdx: number;
  className?: string;
  children: React.ReactNode;
} & NavLinkProps;

const CustomNavLink = ({
  to,
  pageIdx,
  className,
  children,
  ...props
}: CustomLinkType) => {
  const { setIcon } = useLinksStore();

  const handleClick = () => {
    const icon = to.split("/")[1] ? to.split("/")[1] : "home";
    setIcon(icon as IconLink, pageIdx);
  };

  return (
    <NavLink
      onClick={handleClick}
      to={to}
      className={classNames(
        window.location.pathname === to && "border-b-8 md:border-b-4",
        "border-black transition-all group-hover:border-b-8 group-hover:md:border-b-4",
        className
      )}
      {...props}
    >
      {children}
    </NavLink>
  );
};

const LinkItem = ({
  to,
  setClose,
  pageIdx,
  className,
  children,
}: {
  to: string;
  pageIdx: number;
  className?: string;
  setClose?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <li onClick={setClose} className="group p-1">
      <CustomNavLink to={to} pageIdx={pageIdx} className={className}>
        {children}
      </CustomNavLink>
    </li>
  );
};

const Menu = ({
  setClose,
  className,
}: {
  setClose?: () => void;
  className?: string;
}) => {
  return (
    <ul className={className}>
      <LinkItem
        pageIdx={1}
        setClose={setClose}
        className="border-pink-500"
        to="/"
      >
        <span>Home</span>
      </LinkItem>
      <LinkItem
        pageIdx={2}
        setClose={setClose}
        className="border-green-500"
        to="/about"
      >
        About
      </LinkItem>
      <LinkItem
        setClose={setClose}
        pageIdx={3}
        className="border-cyan-500"
        to="/resume"
      >
        Resume
      </LinkItem>
      <LinkItem
        setClose={setClose}
        pageIdx={4}
        className="border-fuchsia-500"
        to="/portfolio"
      >
        Portfolio
      </LinkItem>
      <LinkItem
        setClose={setClose}
        pageIdx={5}
        className="border-lime-500"
        to="/contact"
      >
        Contact
      </LinkItem>
      <li>
        <ModeToggle />
      </li>
    </ul>
  );
};

const MainNav = ({
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <nav className={classNames("mx-2")}>
      <Button
        className="m-0 block h-full w-fit bg-transparent p-0 text-pink-950 shadow-none hover:bg-transparent hover:text-fuchsia-700 md:hidden dark:bg-transparent dark:text-white dark:hover:text-fuchsia-400"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Icon name="hamburger" className="m-0 size-8 p-0" />
      </Button>
      <Menu className="hidden items-center gap-2 align-middle md:flex md:flex-row" />
    </nav>
  );
};

const logoColors = [
  "group-hover:fill-pink-500 dark:group-hover:fill-pink-500",
  "group-hover:fill-green-500 dark:group-hover:fill-green-500",
  "group-hover:fill-cyan-500 dark:group-hover:fill-cyan-500",
  "group-hover:fill-fuchsia-500 dark:group-hover:fill-fuchsia-500",
  "group-hover:fill-lime-500 dark:group-hover:fill-lime-500",
];

export const Header = ({ className }: { className: string }) => {
  const [logoColorIdx, setLogoColorIdx] = useState<number>(3);
  const [isOpen, setIsOpen] = useState(false);

  const setClose = () => setIsOpen(false);

  return (
    <div className={classNames("border-blue-500 px-2 pt-1", className)}>
      <div
        className={classNames(
          "glass absolute top-0 left-0 z-50 h-screen w-screen flex-col md:hidden",
          isOpen ? "flex" : "hidden"
        )}
      >
        <Button
          onClick={setClose}
          className="mx-auto my-5 size-20 bg-transparent text-pink-950 shadow-none hover:bg-transparent hover:text-fuchsia-700 dark:text-white dark:hover:text-fuchsia-400"
        >
          <Icon name="close" className="size-10 h-24 w-24" />
        </Button>
        <Menu
          setClose={setClose}
          className="mx-auto flex-col items-center *:border-red-200 *:py-5 *:text-center *:text-5xl"
        />
      </div>
      <header className="glass container mx-auto flex items-center justify-between rounded-xl border border-pink-950/5 p-1 pt-1.5 drop-shadow-xl dark:border-pink-50/10">
        <span>
          <CustomNavLink
            onMouseOver={() => {
              setLogoColorIdx(
                logoColorIdx < logoColors.length - 1 ? logoColorIdx + 1 : 0
              );
            }}
            to="/"
            pageIdx={1}
            className="group"
            aria-label="Home navigation"
          >
            <Logo
              aria-label="Logo"
              className={classNames(
                "pointer-events-none mx-2 h-10 w-48 drop-shadow-sm/10 group-hover:transition-all dark:fill-white dark:drop-shadow-sm",
                logoColors[logoColorIdx]
              )}
            />
          </CustomNavLink>
        </span>
        <MainNav isOpen={isOpen} setIsOpen={setIsOpen} />
      </header>
    </div>
  );
};
