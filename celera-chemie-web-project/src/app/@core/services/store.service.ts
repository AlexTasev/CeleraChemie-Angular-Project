import { User } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';

export class Store {
  private _selectedLanguage: string;

  selectedLanguage$: BehaviorSubject<string> = new BehaviorSubject(this.selectedLanguage);

  get selectedLanguage(): string | '' {
    return this._selectedLanguage;
  }

  set selectedLanguage(language: string) {
    this.selectedLanguage$.next(language);
    this._selectedLanguage = language;
  }

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
