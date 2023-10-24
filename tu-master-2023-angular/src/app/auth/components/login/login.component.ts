import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { finalize } from 'rxjs/operators';
import { EmailValidator } from 'src/app/core/validators/email.validator';

export const emailValidatorFn = EmailValidator.validateByRegex(
  /[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]+/gm
);

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    StyleClassModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    MessagesModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: WritableSignal<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, emailValidatorFn]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.isLoading = signal(false);
  }

  submitForm() {
    let { email, password } = this.loginForm.value;

    this.isLoading.set(true);

    this.authService
      .login(email, password)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe({
        next: (userCred) => {
          this.setSession(userCred);
          this.authService.isLoggedIn.update((val) => true);

          this.router.navigate(['']);
        },
        error: (err) => {
          if (err.message.indexOf('auth/invalid-login-credentials') >= 0) {
            this.messageService.add({
              severity: 'error',
              detail: 'Invalid password!',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              detail: 'User do not exist!',
            });
          }
        },
      });
  }

  private setSession(authResult: any) {
    localStorage.setItem(
      '_tokenResponse',
      JSON.stringify(authResult._tokenResponse)
    );
    localStorage.setItem(
      'expiresIn',
      new Date(
        new Date().getTime() + authResult._tokenResponse.expiresIn * 60000
      ).toUTCString()
    );
  }
}
