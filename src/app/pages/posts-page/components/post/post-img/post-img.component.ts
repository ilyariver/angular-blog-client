import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-post-img',
  imports: [],
  templateUrl: './post-img.component.html',
  styleUrl: './post-img.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostImgComponent {
  @Input() imageUrl: string | null = null;

  placeholder: string = '/assets/images/placeholder-image.jpg';
}
