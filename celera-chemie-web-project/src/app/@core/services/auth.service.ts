import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticated(): Promise<boolean> {
    return this.http.get<boolean>('auth/authenticated').pipe(first()).toPromise();
  }

  register(registerInput: User): Observable<any> {
    return this.http.post('auth/signup', registerInput);
  }
}
