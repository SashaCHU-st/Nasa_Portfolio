const ITEMS_PER_PAGE = 6;

export const paginate = <T>(list: T[], currentPage: number) => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const items = list.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);
  return { items, totalPages };
};
