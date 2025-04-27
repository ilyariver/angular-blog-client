import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-post-comments',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCommentsComponent {

}
