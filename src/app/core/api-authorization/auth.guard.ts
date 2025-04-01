// import { CanActivateFn } from '@angular/router';
// import {AuthService} from './auth.service';
// import {tap} from 'rxjs';
// import {inject} from '@angular/core';
//
// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//
//   return authService.canActivateProtectedRoutes$
//     .pipe(tap(x => console.log('Ты пытался перейти в ' + state.url + ', и этот guard сказал ' + x)));
// };
