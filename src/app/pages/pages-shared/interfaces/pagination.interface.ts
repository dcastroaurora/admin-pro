export interface Pagination<T> {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  data: T[];
  message: string;
}
