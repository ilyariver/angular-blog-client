import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-dialog-close',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './dialog-close.component.html',
  styleUrl: './dialog-close.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogCloseComponent {
  readonly dialogRef = inject(MatDialogRef<DialogCloseComponent>);
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
    this.dialogRef.close();
  }
}
