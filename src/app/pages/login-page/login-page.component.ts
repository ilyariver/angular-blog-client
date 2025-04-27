import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../../core/services/auth/auth.service';
import {ToastService} from '../../shared/services/toast.service';
import {shakeAnimation} from '../../shared/animation/shake-animation';
import {Router} from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  animations: [shakeAnimation]
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public formLogin!: FormGroup;
  public triggeredErrorShake = false;

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initFormLogin();
  }

  private initFormLogin() {
    this.formLogin = this.fb.group({
      email: ['test@test.ru', [Validators.required, Validators.email]],
      password: ['123456789', Validators.required]
    })
  }

  public send() {
    const {email, password} = this.formLogin.value;
    if (!this.formLogin.invalid) {
      this.authService.login({email, password})
        .subscribe({
          next: result => {
            const isAuth = Boolean(result);
            this.authService.isAuthStateChange(isAuth);
            this.toast.show('success', 'Приветствую!', result.fullName);
            if (isAuth) {
              this.router.navigate(['/']);
            }
          },
          error: error => {
            this.triggeredErrorShake = true;
            setTimeout(() => this.triggeredErrorShake = false, 1500);
            if (error.error && error.error.message) {
              this.toast.show('error', 'Ошибка!', error.error.message);
              return;
            }
            error.error?.forEach((item: any) => this.toast.show('error', item.path, item.msg));
          },
        })
    }
  }

  ngOnDestroy() {
    this.formLogin.reset();
  }
}
