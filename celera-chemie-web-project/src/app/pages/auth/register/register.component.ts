import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from 'src/app/@core/services/store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../common-styles/form.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private toastrService: ToastrService,
  ) {}
  form: FormGroup;

  // validations
  isFormValid = false;
  invalidNameMessage = '';
  invalidPhoneMsg = '';
  invalidOrgMsg = '';
  invalidPasswordMsg = '';
  invalidRepeatPassMsg = '';

  ngOnInit(): void {
    this.initializeForm();
    console.log(this.form);
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

    if (this.isFormValid && this.form.valid) {
      // call register service
    }
  }

  validateForm() {
    const {
      email,
      organization,
      nameOfUser,
      phoneNumber,
      password,
      repeatPassword,
    } = this.form.value;

    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    const phoneNumberRegex = new RegExp(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
    );

    if (!emailRegex.test(email)) {
      this.isFormValid = false;
      this.invalidNameMessage = `${email} is not valid e-mail. Please provide correct e-mail`;
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
  }
}
