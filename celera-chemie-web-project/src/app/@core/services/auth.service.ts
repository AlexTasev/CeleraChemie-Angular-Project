import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(registerInput: User): Observable<any> {
    return this.http.post('auth/signup', registerInput);
  }

  login(loginInput): Observable<any> {
    return this.http.post('auth/login', loginInput);
  }

  isAuthenticated() {
    return this.http.get('auth/check').pipe(first()).toPromise();
  }

  isAdmin() {
    return this.http.get('auth/admin').pipe(first()).toPromise();
  }
}
