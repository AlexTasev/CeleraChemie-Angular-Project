import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/@core/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService, private toastrService: ToastrService) {}

  users: User[] = [];
  private _ngDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService
      .getAll()
      .pipe(takeUntil(this._ngDestroy$))
      .subscribe(
        (users) => {
          Object.assign(this.users, users);
        },
        () => this.toastrService.error('Unable to get Users data'),
      );
  }

  deleteUser(id) {
    const confirmed = confirm('Are you sure you want to delete this user?');

    if (confirmed) {
      this.userService
        .delete(id)
        .pipe(takeUntil(this._ngDestroy$))
        .subscribe(() => {
           this.toastrService.success('Selected user successfully removed');
           this.users = [];
           this.getAllUsers();
          }, () => this.toastrService.error('Unable to remove user'),
      );
    }
  }

  ngOnDestroy() {
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
