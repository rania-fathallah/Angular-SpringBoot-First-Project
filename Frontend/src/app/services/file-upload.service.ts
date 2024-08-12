import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileDetails } from '../shared/fileDetails';

import { uploadUrl } from '../shared/uploadUrl';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private httpClient: HttpClient) { }

  upload(postId: number, file: File): Observable<FileDetails[]> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    
    return this.httpClient.post<FileDetails[]>(uploadUrl, formData);
  }
  

  getFiles(): Observable<any> {
    return this.httpClient.get<any>(uploadUrl);
  }
}


