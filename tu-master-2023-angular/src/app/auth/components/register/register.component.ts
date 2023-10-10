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
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading: WritableSignal<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
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
      return;
    }

    this.isLoading.set(true);

    this.authService.register(this.registerForm.value).subscribe((resp) => {
      this.isLoading.set(false);
      this.router.navigate(['login']);
    });
  }
}
