import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-full-post-img',
  imports: [],
  templateUrl: './full-post-img.component.html',
  styleUrl: './full-post-img.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullPostImgComponent {
  @Input() imageUrl: string | null = null;

  placeholder: string = '/assets/images/placeholder-image.jpg';
}
