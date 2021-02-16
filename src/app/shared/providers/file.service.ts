import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileModel } from '../models/file.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  updatePicture(
    file: File,
    collection: string,
    id: string
  ): Observable<FileModel> {
    const data = new FormData();
    data.append('image', file);

    return this.http.post<FileModel>(
      `${environment.base_url}/upload/${collection}/${id}`,
      data,
      {
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
      }
    );
  }
}
