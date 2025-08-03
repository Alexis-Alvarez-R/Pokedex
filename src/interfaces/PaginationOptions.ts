export interface PaginationOptions {
  currentPage: number;
  totalPages: number;
  maxButtons: number;
  onPageChange: (page: number) => void;
}
