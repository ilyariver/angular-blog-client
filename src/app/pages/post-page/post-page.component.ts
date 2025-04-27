import { ChangeDetectionStrategy, Component } from '@angular/core';
import {PostCommentsComponent} from './components/post-comments/post-comments.component';
import {FullPostComponent} from '../posts-page/components/full-post/full-post.component';

@Component({
  selector: 'app-post-page',
  imports: [
    PostCommentsComponent,
    FullPostComponent
  ],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostPageComponent {

}
