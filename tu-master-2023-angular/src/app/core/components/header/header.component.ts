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
    this.authService.logout().subscribe((resp) => {
      if (resp.loggedOut) {
        this.router.navigate(['']);
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.authService.isLoggedIn.update((val) => false);
      }
    });
  }
}
