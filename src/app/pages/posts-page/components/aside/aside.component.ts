import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TagBadgeComponent} from '../../../../shared/components/tag-badge/tag-badge.component';
import {CommentsComponent} from './components/comments/comments.component';

@Component({
  selector: 'app-aside',
  imports: [
    TagBadgeComponent,
    CommentsComponent,
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent {
  @Input() tags: string[] = [];

  public userInfo = {
    name: 'Вася пупкин',
    image: '/../assets/images/avatar1.png',
  }
}
