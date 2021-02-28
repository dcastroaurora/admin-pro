import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { IAuth } from '../interfaces/auth.interface';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;
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

  login(data: User): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${environment.base_url}/auth/login`, data)
      .pipe(
        tap((res: IAuth) => {
          this.saveLocalStorage(res);
        })
      );
  }

  loginGoogle(token: string): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${environment.base_url}/auth/google`, { token })
      .pipe(
        tap((res: IAuth) => {
          this.saveLocalStorage(res);
        })
      );
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): string {
    return this.user.role || '';
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get<IAuth>(`${environment.base_url}/auth/renewToken`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: IAuth) => {
          const { email, google, id, image, name, role } = res.user;
          this.user = new User(name, email, id, '', image, google, role);
          this.saveLocalStorage(res);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  createUser(data: User): Observable<IAuth> {
    return this.http.post<IAuth>(`${environment.base_url}/user`, data).pipe(
      tap((res: IAuth) => {
        this.saveLocalStorage(res);
      })
    );
  }

  updateProfile(data: User): Observable<IAuth> {
    return this.http.put<IAuth>(
      `${environment.base_url}/user/${data.id}`,
      data,
      {
        headers: {
          'x-token': this.token,
        },
      }
    );
  }

  saveLocalStorage(response: IAuth) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('menu', JSON.stringify(response.menu));
  }
}
