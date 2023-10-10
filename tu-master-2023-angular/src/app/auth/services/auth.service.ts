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
  isLoggedIn;

  constructor() {
    if (this.getExpiration()) {
      this.isLoggedIn = signal(this.getExpiration() > new Date());
    } else {
      this.isLoggedIn = signal(false);
    }
  }

  login(username: string, password: string) {
    let fakeHttp = new BehaviorSubject({
      username,
      password,
      loginSuccessfully: true,
    });

    return fakeHttp.pipe(
      delay(2000),
      tap((item) => {
        this.setSession(item);
      })
    );
    //TODO make http request to get JWT token and save it in session
  }

  logout() {
    let fakeHttp = new BehaviorSubject({ loggedOut: true });

    return fakeHttp.pipe(
      delay(2000),
      tap(() => {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.isLoggedIn.update((val) => false);
      })
    );

    //TODO clear client session and as an advanced option make http request to logout on server
  }

  register(registerForm: IRegisterForm): Observable<any> {
    let fakeHttp = new BehaviorSubject(registerForm);

    return fakeHttp.pipe(delay(2000));
    //TODO make http request to register user
  }

  private setSession(authResult: any) {
    localStorage.setItem('id_token', authResult.username);
    localStorage.setItem(
      'expires_at',
      new Date(new Date().getTime() + 5 * 60000).toUTCString()
    );
    this.isLoggedIn.update((val) => true);
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      const expiresAt = new Date(expiration);
      return expiresAt;
    } else {
      return false;
    }
  }
}
