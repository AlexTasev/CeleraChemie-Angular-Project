import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Store } from '../services/store.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {
  constructor(private readonly router: Router, private store: Store) {}

  isAuthenticated: boolean;
  private _ngDestroy$ = new Subject<void>();


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.userToken$.pipe(takeUntil(this._ngDestroy$)).subscribe((token) => {
        token ? (this.isAuthenticated = true) : (this.isAuthenticated = false);
      });
    if (this.isAuthenticated) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });

    return false;
  }

  ngOnDestroy() {
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
