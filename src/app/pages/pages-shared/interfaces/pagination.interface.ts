import { User } from 'src/app/auth/auth-shared/models/user.model';

export interface Pagination {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}
