import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {inject, PLATFORM_ID} from '@angular/core';
import {map} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));


  return authService.isLoggedIn$.pipe(
    map(isLoggedIn => {
      if (_isBrowser) {
        if (!window.localStorage.getItem('token') && !isLoggedIn) {
          router.navigate(['/login']);
          return false;
        }
      }
      return true;
    })
  );
};
