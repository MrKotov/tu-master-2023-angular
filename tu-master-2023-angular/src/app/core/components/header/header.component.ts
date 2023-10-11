import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

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
