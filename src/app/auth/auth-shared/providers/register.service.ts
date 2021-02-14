import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  createUser(data: User): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.base_url}/user`, data).pipe(
      tap((res: UserModel) => {
        console.log('aaaa');
        localStorage.setItem('token', res.token);
      })
    );
  }
}
