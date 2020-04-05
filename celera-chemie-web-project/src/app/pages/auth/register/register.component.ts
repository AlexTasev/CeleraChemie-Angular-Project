import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/@core/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import constants from '../../../@core/utils/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../common-styles/form.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,
  ) {}

  form: FormGroup;
  private _ngDestroy$ = new Subject<void>();

  // validations
  isFormValid = true;

  invalidNameMessage = '';
  invalidPhoneMsg = '';
  invalidOrgMsg = '';
  invalidPasswordMsg = '';
  invalidRepeatPassMsg = '';
  invalidEmailMessage = '';

  ngOnInit(): void {
    this._initializeForm();
  }

  private _initializeForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      organization: ['', Validators.required],
      nameOfUser: '',
      phoneNumber: '',
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  registerUser() {
    this.validateForm();
    const user = this.form.value;

    if (this.isFormValid && this.form.valid) {
      this.authService
        .register(user)
        .pipe(takeUntil(this._ngDestroy$))
        .subscribe(() => {
            this.toastrService.success(`${this.form.value.email} registered successfully`, 'User registered');
            this.router.navigate(['/login']);
          }, (err) => this.toastrService.error(`${err.error.message}`, 'User registration failed'),
        );
    }
  }

  validateForm() {
    const { email, organization, nameOfUser, phoneNumber, password, repeatPassword } = this.form.value;

    if (!constants.emailRegex.test(email)) {
      this.isFormValid = false;
      this.invalidEmailMessage = `E-mail ${email} is not valid. Please provide correct e-mail`;
      setTimeout(() => { this.isFormValid = true; this.invalidEmailMessage = ''; }, 3000);
    }

    if (organization.length < 2 || !constants.specialCharsShortRegex.test(organization)) {
      this.isFormValid = false;
      this.invalidOrgMsg = `Organization name ${organization} is not valid. Please provide correct organization name`;
      setTimeout(() => { this.isFormValid = true; this.invalidOrgMsg = ''; }, 3000);
    }

    if (nameOfUser && !constants.specialCharsShortRegex.test(nameOfUser)) {
      this.isFormValid = false;
      this.invalidNameMessage = `Name ${nameOfUser} is not valid. Please provide correct name`;
      setTimeout(() => { this.isFormValid = true; this.invalidNameMessage = ''; }, 3000);
    }

    if (password) {
      if (password === '' || password.length < 8) {
        this.isFormValid = false;
        this.invalidPasswordMsg = 'Password must be at least 8 characters long';
        setTimeout(() => { this.isFormValid = true; this.invalidPasswordMsg = ''; }, 3000);
      }
    }

    if (password !== repeatPassword) {
      this.isFormValid = false;
      this.invalidRepeatPassMsg = 'Passwords do not match';
      setTimeout(() => { this.isFormValid = true; this.invalidRepeatPassMsg = ''; }, 3000);
    }

    if (phoneNumber && !constants.phoneNumberRegex.test(phoneNumber)) {
      this.isFormValid = false;
      this.invalidPhoneMsg = `${phoneNumber} is not valid phone number. Please provide correct phone number`;
      setTimeout(() => { this.isFormValid = true; this.invalidPhoneMsg = ''; }, 3000);
    }
  }

  ngOnDestroy() {
    clearTimeout();
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
