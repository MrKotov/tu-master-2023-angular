import { Component, Signal, WritableSignal, signal } from '@angular/core';
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
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading: WritableSignal<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.registerForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.isLoading = signal(false);
  }

  submitForm() {
    if (
      this.registerForm.value.password != this.registerForm.value.repeatPassword
    ) {
      this.registerForm.controls['repeatPassword'].setErrors({ valid: false });
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Passwords dont match!',
      });
      return;
    }

    this.isLoading.set(true);

    this.authService.register(this.registerForm.value).subscribe((resp) => {
      this.isLoading.set(false);
      this.router.navigate(['login']);
    });
  }
}
