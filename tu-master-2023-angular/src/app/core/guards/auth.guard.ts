import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (state.url == '/register' || state.url == '/login' ) {
    return !inject(AuthService).isLoggedIn();
  }
  return inject(AuthService).isLoggedIn();
};
