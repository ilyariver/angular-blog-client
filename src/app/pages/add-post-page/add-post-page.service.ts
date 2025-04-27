import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_BASE_URL} from '../../app.config';
import {AddPostPage} from './add-post-page.models';

@Injectable({
  providedIn: 'root'
})
export class AddPostPageService {
  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private baseUrl: string,
  ) { }

  createNewPost(params: AddPostPage): Observable<AddPostPage> {
    return this.http.post<AddPostPage>(`${this.baseUrl}/posts`, params);
  }

  uploadImage(params: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/upload`, params);
  }
}
