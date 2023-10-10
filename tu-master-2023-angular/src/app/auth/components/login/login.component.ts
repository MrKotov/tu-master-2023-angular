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
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.isLoading = signal(false);
  }

  submitForm() {
    let { username, password } = this.loginForm.value;

    this.isLoading.set(true);

    this.authService.login(username, password).subscribe((resp) => {
      this.isLoading.set(false);

      if (resp.loginSuccessfully) {
        this.router.navigate(['']);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Username or password are wrong!',
        });
      }
    });
  }
}
