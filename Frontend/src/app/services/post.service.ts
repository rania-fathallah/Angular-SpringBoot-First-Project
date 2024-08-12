import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from '../shared/baseUrl';
import { Post } from '../shared/post';
import { Observable, catchError } from 'rxjs';
import { ProcesshttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, @Inject('BaseURL') private baseUrl: string,
    private processHTTPMsgService: ProcesshttpmsgService) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}posts`)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}posts/${id}`);
  }

  deletePostById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}posts/${id}`);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}posts`, post, this.httpOptions);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}posts/${post.id}`, post, this.httpOptions)
  }
}

