import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_BASE_URL} from '../../app.config';
import {BehaviorSubject, Observable} from 'rxjs';
import {Post} from './posts-page.models';

@Injectable({
  providedIn: 'root',
})
export class PostsPageService {
  private _getPosts: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  updatedPosts: Observable<any> = this._getPosts.asObservable();

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

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/${postId}`);
  }

  updatePosts() {
    this._getPosts.next(null);
  }
}
