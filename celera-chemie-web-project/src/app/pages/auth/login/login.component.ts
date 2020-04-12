import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from 'src/app/@core/services/store.service';
import constants from '../../../@core/utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../common-styles/form.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private authService: AuthService,
    private store: Store,
  ) {}

  form: FormGroup;
  private _ngDestroy$ = new Subject<void>();
  imgSrc = constants.images.welcomeImg;

  // validations
  isFormValid = true;
  invalidNameMessage = '';
  invalidPasswordMsg = '';

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    this.validateForm();

    const user = this.form.value;

    if (this.isFormValid && this.form.valid) {
      this.authService
        .login(user)
        .pipe(takeUntil(this._ngDestroy$))
        .subscribe((res) => {
            this.store.token = res.token;
            this.store.userId = res.user.userId;
            res.user.roles.includes('Admin') ? this.store.role = 'Admin' : this.store.role = null;
            this.toastrService.success(`${this.form.value.email} logged in successfully`, 'User logged in');
            this.router.navigate(['/']);
          }, (err) => this.toastrService.error(`${err.error.message}`, 'User login failed'),
        );
    }
  }

  validateForm() {
    const { email, password } = this.form.value;

    if (!constants.emailRegex.test(email)) {
      this.isFormValid = false;
      this.invalidNameMessage = `E-mail ${email} is not valid. Please provide correct e-mail`;
      setTimeout(() => {  this.isFormValid = true;  this.invalidNameMessage = ''; } , 3000);
    }

    if (password === '' || password.length < 8) {
      this.isFormValid = false;
      this.invalidPasswordMsg = 'Password must be at least 8 characters long';
      setTimeout(() => { this.isFormValid = true; this.invalidPasswordMsg = ''; }, 3000);
    }
  }

  ngOnDestroy() {
    clearTimeout();
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
