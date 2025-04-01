import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ArticleComponent} from './components/article/article.component';
import {AsideComponent} from './components/aside/aside.component';

@Component({
  selector: 'app-home-page',
  imports: [
    ArticleComponent,
    AsideComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {

}
