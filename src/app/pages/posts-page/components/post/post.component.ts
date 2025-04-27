import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PostImgComponent} from './post-img/post-img.component';
import {Post} from '../../posts-page.models';
import {AsyncPipe, DatePipe} from '@angular/common';
import {AuthService} from '../../../../core/services/auth/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    PostImgComponent,
    DatePipe,
    AsyncPipe,
  ]
})
export class PostComponent implements OnInit {
  @Input() data!: Post;

  public currentUserId$!: Observable<string | undefined>;

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.currentUserId$ = this.authService.currentUserId$;
  }

  removePost(postId: string): void {

  }
}
