import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, PLATFORM_ID} from '@angular/core';
import {SafeContentPipe} from '../../../../core/pipes/safe-content.pipe';
import {ActivatedRoute, Router} from '@angular/router';
import {FullPostImgComponent} from './post-img/full-post-img.component';
import {Post} from '../../posts-page.models';
import {DatePipe, isPlatformBrowser} from '@angular/common';
import {PostsPageService} from '../../posts-page.service';
import {SkFullPostComponent} from '../../../../shared/skeletons/sk-full-post/sk-full-post.component';
import {API_BASE_URL} from '../../../../app.config';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrl: './full-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SafeContentPipe,
    DatePipe,
    FullPostImgComponent,
    SkFullPostComponent,
  ],
})
export class FullPostComponent {
  public post!: Post;
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsPageService,
    private cd: ChangeDetectorRef,
    @Inject(API_BASE_URL) public baseUrl: string,
  ) {
    const postId = this.route.snapshot.params['id'];

    if (postId) {
      if (this.isBrowser) {
        this.postsService.getFullPost(postId)
          .subscribe(post => {
            // ToDO Временное решение для удаления неразрывных пробелов.
            //  Удалить, если уберут ошибку в пакете Quill-editor.
            this.post = {...post, text: post.text.replace(/&nbsp;/g, ' ')};
            this.cd.detectChanges();
          });
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  cleanText(dirtyText: string): string {
    const doc = new DOMParser().parseFromString(dirtyText, 'text/html');
    return doc.documentElement.textContent || '';
  }
}
