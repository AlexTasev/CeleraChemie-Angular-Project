import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getById(id: string) {
    return this.http.get(`users/${id}`);
  }

  update(id: string, user: User) {
    return this.http.put(`users/${id}`, user);
  }

  delete(id: string) {
    return this.http.delete(`users/${id}`)
  }
}
