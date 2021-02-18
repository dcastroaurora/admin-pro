import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth-shared/providers/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.validateToken().pipe(
      tap((res: boolean) => {
        if (!res) this.router.navigateByUrl('/login');
      })
    );
  }
}
