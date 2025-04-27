import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_BASE_URL} from '../../app.config';
import {Observable} from 'rxjs';
import {Post} from './posts-page.models';

@Injectable()
export class PostsPageService {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private baseUrl: string,
  ) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  getLastTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/tags`);
  }

  getFullPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${postId}`);
  }
}
