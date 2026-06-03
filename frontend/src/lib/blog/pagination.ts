export const BLOG_POSTS_PER_PAGE = 10;

type PageParam = string | string[] | undefined;

export function getPageNumber(value?: PageParam) {
  const rawPage = Array.isArray(value) ? value[0] : value;
  const page = Number.parseInt(rawPage ?? "1", 10);

  return Number.isNaN(page) || page < 1 ? 1 : page;
}

export function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) return [1, 2, 3, 4, totalPages];
  if (currentPage >= totalPages - 2) {
    return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
}

type PaginateItemsOptions = {
  page?: PageParam;
  pageSize: number;
};

export function paginateItems<T>(
  items: T[],
  { page, pageSize }: PaginateItemsOptions
) {
  const currentPage = getPageNumber(page);
  const totalPages = Math.ceil(items.length / pageSize);
  const pageItems = items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return {
    currentPage,
    totalPages,
    pageItems,
    showPagination: items.length > pageSize,
    isOutOfRange: totalPages > 0 && currentPage > totalPages,
    visiblePages: getVisiblePages(currentPage, totalPages),
  };
}
