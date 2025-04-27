import {Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {HeaderComponent} from './core/layout/header/app-header.component';
import {RouterOutlet} from '@angular/router';
import {ToastComponent} from './shared/components/toast/toast.component';
import {AuthService} from './core/services/auth/auth.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterOutlet,
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    if (this._isBrowser) {
      const token = window.localStorage.getItem('token');
      if (token && !this.authService.isLoggedIn$) {
        this.authService.isAuthStateChange(true);
      }
    }
  }
}
