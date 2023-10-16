import { Injectable } from '@angular/core';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _loggedUser: User | null = null;

  public get loggedUser(): User | null {
    return this._loggedUser;
  }
  public set loggedUser(value: User | null) {
    this._loggedUser = value;
  }

  constructor(private authService: AuthService) {
    onAuthStateChanged(authService.auth, (user) => {
      this.loggedUser = user;
    });
  }
}
