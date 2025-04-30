import {ChangeDetectionStrategy, Component, inject, Inject, Input, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PostImgComponent} from './post-img/post-img.component';
import {Post} from '../../posts-page.models';
import {AsyncPipe, DatePipe} from '@angular/common';
import {AuthService} from '../../../../core/services/auth/auth.service';
import {Observable} from 'rxjs';
import {API_BASE_URL} from '../../../../app.config';
import {PostsPageService} from '../../posts-page.service';
import {ToastService} from '../../../../shared/services/toast.service';
import {MatDialog} from '@angular/material/dialog';
import {DeletePostDialogComponent} from './delete-post-dialog/delete-post-dialog.component';

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
  readonly dialog = inject(MatDialog);
  public currentUserId$!: Observable<string | undefined>;

  constructor(
    private authService: AuthService,
    private postsPageService: PostsPageService,
    private toastService: ToastService,
    @Inject(API_BASE_URL) public baseUrl: string,
  ) {
  }

  ngOnInit() {
    this.currentUserId$ = this.authService.currentUserId$;
  }

  showDeleteConfirm(postId: string, postTitle: string): void {
    const dialogRef = this.dialog.open(DeletePostDialogComponent, {
      data: {
        postTitle,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removePost(postId, postTitle);
      }
    })
  }

  removePost(postId: string, postTitle: string): void {
    this.postsPageService.deletePost(postId)
      .subscribe({
        next: () => {
          this.toastService.show('success', 'Успешно', `"Статья ${postTitle} удалена."`);
        },
        error: err => {
          this.toastService.show('error', 'Не удалось удалить статью.', err.message)
        },
        complete: () => this.postsPageService.updatePosts(),
      })
  }
}
