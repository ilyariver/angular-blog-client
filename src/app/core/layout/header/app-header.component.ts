import {
  Component, inject, OnInit,
} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogCloseComponent} from './dialog-close/dialog-close.component';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-header',
  imports: [
    RouterLinkActive,
    RouterLink,
    MatMenuModule,
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class HeaderComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  public isAuth = false;
  public currentUserName!: string;
  public avatarUrl!: string | undefined;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$
      .subscribe(isAuth => {
        this.isAuth = isAuth;
        if (isAuth && !this.currentUserName) {
          this.authService.profile()
            .subscribe(profile => {
              this.currentUserName = profile.fullName;
              this.avatarUrl = profile.avatarUrl;
              this.authService.setCurrentUserId(profile._id);
            });
        }
        if (!isAuth) {
          this.currentUserName = '';
        }
      });
  }

  openConfirmWindow(): void {
    this.dialog.open(DialogCloseComponent);
  }
}
