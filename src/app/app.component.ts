import { Component } from '@angular/core';
import {HeaderComponent} from './core/layout/header/app-header.component';
import {ArticlePostPageComponent} from './article-post-page/article-post-page.component';
import {AddPostPageComponent} from './add-post-page/add-post-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegistrationPageComponent} from './registration-page/registration-page.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ArticlePostPageComponent, AddPostPageComponent, HomePageComponent, LoginPageComponent, RegistrationPageComponent, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
