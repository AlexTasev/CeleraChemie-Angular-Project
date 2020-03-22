import { User } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';

export class Store {
  get token(): string | null {
    return localStorage.getItem('token') || null;
  }

  set token(token: string) {
    if (token == null) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', token);
    }
  }

  get userId(): User['_id'] | null {
    return localStorage.getItem('_userId') || null;
  }

  set userId(id: User['_id'] | null) {
    if (id == null) {
      localStorage.removeItem('_userId');
    } else {
      localStorage.setItem('_userId', id);
    }
  }

  clear() {
    localStorage.clear();
  }
}
