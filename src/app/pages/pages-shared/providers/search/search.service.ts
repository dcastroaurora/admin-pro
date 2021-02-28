import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getSearches(params: any) {
    return this.http.get(`${environment.base_url}/search`, {
      headers: {
        'x-token': localStorage.getItem('token') || '',
      },
      params,
    });
  }
}
