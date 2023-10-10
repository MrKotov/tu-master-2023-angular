import {
  Injectable,
  Signal,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, delay, tap } from 'rxjs';

export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  repeatPass: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(username: string, password: string) {
    let fakeHttp = new BehaviorSubject({ username, password, loginSuccessfully: false });

    return fakeHttp.pipe(
      delay(2000),
      tap((item) => {
        this.setSession(item);
      })
    );
    //TODO make http request to get JWT token and save it in session
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    //TODO clear client session and as an advanced option make http request to logout on server
  }

  register(registerForm: IRegisterForm): Observable<any> {
    let fakeHttp = new BehaviorSubject(registerForm);

    return fakeHttp.pipe(delay(2000));
    //TODO make http request to register user
  }

  private setSession(authResult: any) {
    localStorage.setItem('id_token', authResult.username);
    localStorage.setItem('expires_at', new Date().toISOString());
  }

  public isLoggedIn() {
    return this.getExpiration() > new Date();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at') || '';
    const expiresAt = new Date(expiration);
    return expiresAt;
  }
}
