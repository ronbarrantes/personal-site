"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/#work", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
];

export const SiteHeader = () => {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-bar">
        <Link className="brand" href="/">
          <i aria-hidden="true" />
          Ron Barrantes
        </Link>
        <nav aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={
                    link.href === "/blog" && pathname.startsWith("/blog")
                      ? "page"
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-acts">
          <ThemeToggle />
          <Link className="btn sm" href="/#contact">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};
