import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  items;

  constructor(
    public authService: AuthService,
    private router: Router,
    public userService: UserService
  ) {
    this.items = [
      {
        label: 'Update profile',
        icon: 'pi pi-id-card',
        command: () => {
          this.router.navigate(['/profile']);
        },
      },
      { separator: true },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];
  }

  logout() {
    this.authService.logout().subscribe({
      next: (resp) => {
        this.router.navigate(['']);
        localStorage.removeItem('_tokenResponse');
        localStorage.removeItem('expiresIn');
        this.authService.isLoggedIn.update((val) => false);
      },
    });
  }
}
