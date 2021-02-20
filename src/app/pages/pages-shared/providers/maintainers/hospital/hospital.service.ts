import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHospital } from '../../../interfaces/hospital.interface';
import { Pagination } from '../../../interfaces/pagination.interface';
import { Hospital } from '../../../models/hospital.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  getHospitals(params: any): Observable<Pagination<Hospital>> {
    return this.http.get<Pagination<Hospital>>(
      `${environment.base_url}/hospital`,
      {
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        params,
      }
    );
  }
  findHospitals(): Observable<Pagination<Hospital>> {
    return this.http.get<Pagination<Hospital>>(
      `${environment.base_url}/hospital/find`,
      {
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
      }
    );
  }
  createHospital(name?: string): Observable<IHospital> {
    return this.http.post<IHospital>(
      `${environment.base_url}/hospital`,
      { name },
      {
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
      }
    );
  }

  updateHospital(data: Hospital): Observable<IHospital> {
    return this.http.put<IHospital>(
      `${environment.base_url}/hospital/${data.id}`,
      data,
      {
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
      }
    );
  }

  deleteHospital(id?: string): Observable<IHospital> {
    return this.http.delete<IHospital>(
      `${environment.base_url}/hospital/${id}`,
      {
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
      }
    );
  }
}
