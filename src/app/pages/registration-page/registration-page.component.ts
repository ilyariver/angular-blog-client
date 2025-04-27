import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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
import {Router, RouterLink} from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-registration-page',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationPageComponent implements OnInit {
  formRegistration!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initFormRegistration();
  }

  initFormRegistration() {
    this.formRegistration = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  send() {
    const {fullName, email, password} = this.formRegistration.value;
    if (this.formRegistration.valid) {
      this.authService.register({fullName, email, password})
        .subscribe({
          next: result => {
            this.toast.show('success', result.fullName + ', вы успешно зарегистрированы!', 'Войдите в свою учётку.');
            this.router.navigate(['/login']);
          },
          error: error => {
            if (error.error && error.error.message) {
              this.toast.show('error', 'Ошибка регистрации!', error.error.message);
              return;
            }
            error.error?.forEach((item: any) => this.toast.show('error', item.path, item.msg));
          }
        })
    }
  }
}
