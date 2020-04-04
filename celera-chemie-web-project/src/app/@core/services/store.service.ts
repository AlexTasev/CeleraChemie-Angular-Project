import { User } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';

export class Store {
  private _selectedLanguage: string;
  private _token: string;
  private _role: string;

  selectedLanguage$: BehaviorSubject<string> = new BehaviorSubject(this.selectedLanguage);
  userToken$: BehaviorSubject<string> = new BehaviorSubject(this.token);
  userRole$: BehaviorSubject<string> = new BehaviorSubject(this.role);

  get selectedLanguage(): string | '' {
    return this._selectedLanguage;
  }

  set selectedLanguage(language: string) {
    this.selectedLanguage$.next(language);
    this._selectedLanguage = language;
  }

  get token(): string | null {
    return this._token;
  }

  set token(token: string) {
    if (token == null) {
      localStorage.removeItem('token');
    } else {
      this.userToken$.next(token);
      this._token = token;
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

  get role(): string | null {
    return this._token;
  }

  set role(role: string) {
    this.userRole$.next(role);
    this._role = role;
  }

  clear() {
    localStorage.clear();
  }
}
