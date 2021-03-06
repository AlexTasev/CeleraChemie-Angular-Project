import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private authService: AuthService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = await this.authService.isAuthenticated().catch(() => false);

    if (isAuthenticated) {
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });

    return false;
  }
}
