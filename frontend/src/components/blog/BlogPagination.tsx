import Link from "next/link";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

type BlogPaginationProps = {
  currentPage: number;
  totalPages: number;
  makeHref: (page: number) => string;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) return [1, 2, 3, 4, totalPages];
  if (currentPage >= totalPages - 2) {
    return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
}

export function BlogPagination({
  currentPage,
  totalPages,
  makeHref,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="mt-8 p-5">
      <div className="mb-3 text-sm font-bold uppercase">
        Page {currentPage} of {totalPages}
      </div>

      <Pagination>
        <PaginationContent className="flex flex-wrap justify-center gap-2">
          <PaginationItem>
            {currentPage > 1 ? (
              <Link
                href={makeHref(currentPage - 1)}
                aria-label="Go to previous page"
                className="btn btn-alt min-w-28 justify-center px-4 py-3 text-xs"
              >
                Previous
              </Link>
            ) : (
              <span className="btn btn-alt min-w-28 cursor-not-allowed justify-center px-4 py-3 text-xs opacity-50">
                Previous
              </span>
            )}
          </PaginationItem>

          {visiblePages.map((page, index) => {
            const previousPage = visiblePages[index - 1];
            const showEllipsis = previousPage && page - previousPage > 1;

            return (
              <PaginationItem key={page}>
                {showEllipsis && (
                  <PaginationEllipsis className="tag size-auto px-3 py-3" />
                )}

                <Link
                  href={makeHref(page)}
                  className={
                    page === currentPage
                      ? "btn min-w-14 justify-center px-4 py-3 text-xs"
                      : "btn btn-alt min-w-14 justify-center px-4 py-3 text-xs"
                  }
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </Link>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            {currentPage < totalPages ? (
              <Link
                href={makeHref(currentPage + 1)}
                aria-label="Go to next page"
                className="btn btn-alt min-w-28 justify-center px-4 py-3 text-xs"
              >
                Next
              </Link>
            ) : (
              <span className="btn btn-alt min-w-28 cursor-not-allowed justify-center px-4 py-3 text-xs opacity-50">
                Next
              </span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
