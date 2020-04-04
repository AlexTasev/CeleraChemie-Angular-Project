import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/@core/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

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

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
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
        .subscribe(
          () => {
            this.toastrService.success(`${this.form.value.email} registered successfully`, 'User registered');
            this.router.navigate(['/']);
          },
          (err) => this.toastrService.error(`${err.error.message}`, 'User registration failed'),
        );
    }
  }

  validateForm() {
    const { email, organization, phoneNumber, password, repeatPassword } = this.form.value;

    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    const phoneNumberRegex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g);

    if (!emailRegex.test(email)) {
      this.isFormValid = false;
      this.invalidNameMessage = `E-mail ${email} is not valid. Please provide correct e-mail`;
      setTimeout(() => {
        this.invalidNameMessage = '';
      }, 3000);
    }

    if (organization.length < 2) {
      this.isFormValid = false;
      this.invalidOrgMsg = `${organization} is not valid organization name. Please provide correct organization name`;
      setTimeout(() => {
        this.invalidOrgMsg = '';
      }, 3000);
    }

    if (password) {
      if (password === '' || password.length < 8) {
        this.isFormValid = false;
        this.invalidPasswordMsg = 'Password must be at least 8 characters long';
        setTimeout(() => {
          this.invalidPasswordMsg = '';
        }, 3000);
      }
    }

    if (password !== repeatPassword) {
      this.isFormValid = false;
      this.invalidRepeatPassMsg = 'Passwords do not match';
      setTimeout(() => {
        this.invalidRepeatPassMsg = '';
      }, 3000);
    }

    if (phoneNumber && !phoneNumberRegex.test(phoneNumber)) {
      this.isFormValid = false;
      this.invalidPhoneMsg = `${phoneNumber} is not valid phone number. Please provide correct phone number`;
      setTimeout(() => {
        this.invalidPhoneMsg = '';
      }, 3000);
    }
  }

  ngOnDestroy() {
    clearTimeout();
    this._ngDestroy$.next();
    this._ngDestroy$.complete();
  }
}
