import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {
  @Input() userData!: {
    name: string,
    image: string,
  };
}
