import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from 'src/app/@core/services/store.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  isAuthenticated: boolean;
  isAdmin: boolean;
  private _ngDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.store.userToken$.pipe(takeUntil(this._ngDestroy$)).subscribe((token) => {
      token ? (this.isAuthenticated = true) : (this.isAuthenticated = false);
    });

    this.store.userRole$.pipe(takeUntil(this._ngDestroy$)).subscribe((role) => {
      role === 'Admin' ? (this.isAdmin = true) : (this.isAdmin = false);
    });
  }

  logout() {
    this.store.clear();
  }

  ngOnDestroy() {
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
