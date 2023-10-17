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
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { IUserProfile, UserService } from 'src/app/auth/services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User, updateProfile } from 'firebase/auth';
@Component({
  selector: 'app-edit-user-info',
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
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.scss'],
})
export class EditUserInfoComponent {
  editForm;
  isLoading: WritableSignal<boolean>;

  constructor(private userService: UserService, private router: Router) {
    this.editForm = new FormGroup({
      displayName: new FormControl('', Validators.required),
    });

    this.isLoading = signal(false);
  }

  submitForm() {
    let userData = <IUserProfile>{ ...this.editForm.value };

    if (this.editForm.valid) {
      this.userService.updateUser(userData)?.subscribe((resp) => {
        this.router.navigate(['']);
      });
    }
  }
}
