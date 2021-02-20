import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/auth/auth-shared/models/user.model';
import { environment } from 'src/environments/environment';
import { Pagination } from '../../../interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(params: any): Observable<Pagination<User>> {
    return this.http
      .get<Pagination<User>>(`${environment.base_url}/user`, {
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        params,
      })
      .pipe(
        map((res: Pagination<User>) => {
          const users = res.data.map(
            (user: User) =>
              new User(
                user.name,
                user.email,
                user.id,
                '',
                user.image,
                user.google,
                user.role
              )
          );
          res.data = users;
          return res;
        })
      );
  }

  deleteUser(id?: string) {
    return this.http.delete(`${environment.base_url}/user/${id}`, {
      headers: {
        'x-token': localStorage.getItem('token') || '',
      },
    });
  }
}
