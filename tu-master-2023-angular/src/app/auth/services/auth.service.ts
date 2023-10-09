import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
    console.log('login works', username, password);

    //TODO make http request to get JWT token and save it in session
  }

  logout() {
    console.log('logout works');
    //TODO clear client session and as an advanced option make http request to logout on server
  }

  register(registerForm: IRegisterForm): boolean | Observable<any> {
    if (registerForm.password != registerForm.repeatPass) return false;

    console.log('register works', registerForm);
    return new Subject();
    //TODO make http request to register user
  }
}
