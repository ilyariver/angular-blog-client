import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-empty-page',
  imports: [
    RouterLink
  ],
  templateUrl: './empty-page.component.html',
  styleUrl: './empty-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyPageComponent {

}
