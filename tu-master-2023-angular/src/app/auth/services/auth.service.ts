import {
  Injectable,
  Signal,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, delay, from, tap } from 'rxjs';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { DbService } from 'src/app/db/db.service';

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

  constructor(private db: DbService) {
    if (this.getExpiration()) {
      this.isLoggedIn = signal(this.getExpiration() > new Date());
    } else {
      this.isLoggedIn = signal(false);
    }
  }

  login(email: string, password: string) {
    const auth = getAuth();
    return from(signInWithEmailAndPassword(auth, email, password));
  }

  logout() {
    const auth = getAuth();
    return from(signOut(auth));
  }

  register(registerForm: IRegisterForm): Observable<any> {
    let fakeHttp = new BehaviorSubject(registerForm);

    return fakeHttp.pipe(delay(2000));
    //TODO make http request to register user
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expiresIn');
    if (expiration) {
      const expiresAt = new Date(expiration);
      return expiresAt;
    } else {
      return false;
    }
  }
}
