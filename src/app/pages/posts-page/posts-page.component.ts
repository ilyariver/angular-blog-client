import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {AsideComponent} from './components/aside/aside.component';
import {PostComponent} from './components/post/post.component';
import {PostsPageService} from './posts-page.service';
import {isPlatformBrowser} from '@angular/common';
import {SkPostsPageComponent} from '../../shared/skeletons/sk-posts-page/sk-posts-page.component';
import {Post} from './posts-page.models';
import {ToastService} from '../../shared/services/toast.service';

@Component({
  selector: 'app-post-page',
  imports: [
    PostComponent,
    AsideComponent,
    SkPostsPageComponent,
  ],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsPageComponent implements OnInit {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  public allPosts!: Post[];
  public allTags!: string[];

  constructor(
    private toast: ToastService,
    private postsService: PostsPageService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.postsService.updatedPosts.subscribe(() => this.getAllPosts());
    this.getAllPosts();
    this.getLastTags();
  }

  getAllPosts() {
    if (this.isBrowser) {
      this.postsService.getAllPosts()
        .subscribe({
          next: posts => {
            this.allPosts = posts;
            this.cd.detectChanges();
          },
          error: error => this.toast.show('error', 'Ошибка загрузки статей!', error.message),
        });
    }
  }

  getLastTags() {
    if (this.isBrowser) {
      this.postsService.getLastTags()
        .subscribe({
          next: tags => this.allTags = tags,
          error: error => this.toast.show('error', 'Ошибка загрузки тэгов!',error.message)
        });
    }
  }
}
