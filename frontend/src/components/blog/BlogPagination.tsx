import Link from "next/link";

import { getVisiblePages } from "@/lib/blog/pagination";

type BlogPaginationProps = {
  currentPage: number;
  totalPages: number;
  makeHref: (page: number) => string;
};

export function BlogPagination({
  currentPage,
  totalPages,
  makeHref,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <nav aria-label="Blog pages" className="pager pager-nav">
      <span className="count">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage > 1 ? (
        <Link className="btn o sm" href={makeHref(currentPage - 1)}>
          ← Previous
        </Link>
      ) : (
        <span className="btn o sm" aria-disabled="true">
          ← Previous
        </span>
      )}
      {visiblePages.map((page, index) => {
        const previousPage = visiblePages[index - 1];
        const showEllipsis = previousPage && page - previousPage > 1;

        return (
          <span key={page} className="pager">
            {showEllipsis && <span aria-hidden="true">…</span>}
            <Link
              className={page === currentPage ? "btn sm" : "btn o sm"}
              href={makeHref(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              <span className="sr-only">Page </span>
              {page}
            </Link>
          </span>
        );
      })}
      {currentPage < totalPages ? (
        <Link className="btn o sm" href={makeHref(currentPage + 1)}>
          Next →
        </Link>
      ) : (
        <span className="btn o sm" aria-disabled="true">
          Next →
        </span>
      )}
    </nav>
  );
}
