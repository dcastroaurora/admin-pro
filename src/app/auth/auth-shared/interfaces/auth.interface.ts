import { User } from '../models/user.model';

export interface IAuth {
  user: User;
  token: string;
  message: string;
  menu: [];
}
