import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ArticleComponent} from '../home-page/components/article/article.component';
import {ArticleCommentsComponent} from './components/article-comments/article-comments.component';

@Component({
  selector: 'app-article-post-page',
  imports: [
    ArticleComponent,
    ArticleCommentsComponent
  ],
  templateUrl: './article-post-page.component.html',
  styleUrl: './article-post-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlePostPageComponent {

}
