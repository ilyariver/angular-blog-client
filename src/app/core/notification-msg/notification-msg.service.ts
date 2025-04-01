import {inject, Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationMsgService {
  private _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public success(message: string) {
    this.openSnackBar(message, '', 'success-snackbar');
  }

  public warning(message: string) {
    this.openSnackBar(message, '', 'warning-snackbar');
  }

  public error(message: string) {
    this.openSnackBar(message, '', 'error-snackbar');
  }

  openSnackBar(
    message: string,
    action: string,
    className = '',
    duration = 5_000
  ) {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration,
      panelClass: [className]
    });
  }
}
