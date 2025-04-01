// import { CanActivateFn } from '@angular/router';
// import {filter, switchMap, tap} from 'rxjs';
// import {inject} from '@angular/core';
// import {AuthService} from './auth.service';
//
// export const authWithForcedLoginGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//
//   return authService.isDoneLoading$.pipe(
//     filter(isDone => isDone),
//     switchMap(_ => authService.isAuthenticated$),
//     tap(isAuthenticated => isAuthenticated || authService.login(state.url)),
//   );
// };
