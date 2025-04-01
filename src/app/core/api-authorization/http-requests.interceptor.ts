import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {LoaderService} from '../loader/loader.service';

export const httpRequestsInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  loaderService.start(req);

  return next(req)
    .pipe(catchError((err) => {
      loaderService.stop(req);
      return throwError(err);
    }))
    .pipe(map((evt: any) => {
      if (evt instanceof HttpResponse) {
        loaderService.stop(req);
      }
      return evt;
    }));
};
