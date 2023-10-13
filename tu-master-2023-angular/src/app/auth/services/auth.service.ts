import {
  Injectable,
  Signal,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { Observable, from, tap } from 'rxjs';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { DbService } from 'src/app/db/db.service';

export interface IRegisterForm {
  email: string;
  password: string;
  repeatPass: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn;
  auth;

  constructor(private db: DbService) {
    if (this.getExpiration()) {
      this.isLoggedIn = signal(this.getExpiration() > new Date());
    } else {
      this.isLoggedIn = signal(false);
    }

    this.auth = getAuth();
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
    let { email, password, fullName } = registerForm;
    const auth = getAuth();
    return from(createUserWithEmailAndPassword(auth, email, password)).pipe(
      tap((resp) => {
        let user = resp.user;

        updateProfile(user, {
          displayName: fullName,
        });
      })
    );
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
function updateDisplayName() {
  throw new Error('Function not implemented.');
}
