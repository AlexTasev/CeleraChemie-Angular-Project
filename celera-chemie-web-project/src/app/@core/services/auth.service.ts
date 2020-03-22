import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticated(): Promise<boolean> {
    return this.http
      .get<boolean>('auth/authenticated')
      .pipe(first())
      .toPromise();
  }
}
