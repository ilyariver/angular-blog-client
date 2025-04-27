import {inject, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_BASE_URL} from '../../../app.config';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {User} from '../../../pages/registration-page/registration-page.models';

@Injectable({providedIn: 'root'})
export class AuthService {
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  private _currentUserId: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  public currentUserId$: Observable<string | undefined> = this._currentUserId.asObservable();

  private _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(API_BASE_URL) private baseUrl: string,
  ) {
    if (this._isBrowser) {
      const token = localStorage.getItem('token');
      this._isLoggedIn.next(!!token);
    }
  }

  isAuthStateChange(isAuth: boolean): void {
    this._isLoggedIn.next(isAuth);
  }

  setCurrentUserId(userId: string | undefined): void {
    this._currentUserId.next(userId);
  }

  register(params: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/register`, params)
  }

  login(params: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/login`, params)
      .pipe(
        tap(res => {
          if (this._isBrowser) {
            localStorage.setItem('token', <string>res.token);
            this._isLoggedIn.next(true);
          }
        }),
      );
  }

  profile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/auth/me`);
  }

  logout(): void {
    if (this._isBrowser) {
      localStorage.removeItem('token');
    }
    this._isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (this._isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
