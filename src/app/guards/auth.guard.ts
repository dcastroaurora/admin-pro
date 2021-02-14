import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserModel } from '../auth/auth-shared/models/user.model';
import { LoginService } from '../auth/auth-shared/providers/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loginService.validateToken().pipe(
      tap((res: boolean) => {
        if (!res) this.router.navigateByUrl('/login');
      })
    );
  }
}
