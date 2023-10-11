import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _loggedUser?: User;

  public get loggedUser(): User | undefined {
    return this._loggedUser;
  }
  public set loggedUser(value: User | undefined) {
    this._loggedUser = value;
  }
}
