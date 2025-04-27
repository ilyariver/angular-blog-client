import { Routes } from '@angular/router';
import {EmptyPageComponent} from './pages/empty-page/empty-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {RegistrationPageComponent} from './pages/registration-page/registration-page.component';
import {AddPostPageComponent} from './pages/add-post-page/add-post-page.component';
import {PostEditPageComponent} from './pages/post-edit-page/post-edit-page.component';
import {PostsPageComponent} from './pages/posts-page/posts-page.component';
import {PostPageComponent} from './pages/post-page/post-page.component';
import {authGuard} from './core/services/auth/auth.guard';

export const routes: Routes = [
  {path: '', component: PostsPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'new-post', component: AddPostPageComponent, canActivate: [authGuard]},
  {path: 'article/:id', component: PostPageComponent, canActivate: [authGuard]},
  {path: 'article/:id/edit', component: PostEditPageComponent, canActivate: [authGuard]},
  {path: '**', component: EmptyPageComponent},
];
