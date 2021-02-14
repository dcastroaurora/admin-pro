import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  googleInit(): Promise<void> {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '158862083370-pb4uvq983qclfc9k29erc470b6p0lkpu.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  login(data: User): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${environment.base_url}/auth/login`, data)
      .pipe(
        tap((res: UserModel) => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  loginGoogle(token: string): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${environment.base_url}/auth/google`, { token })
      .pipe(
        tap((res: UserModel) => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get<UserModel>(`${environment.base_url}/auth/renewToken`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((res: UserModel) => {
          localStorage.setItem('token', res.token);
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
