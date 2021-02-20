import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDoctor } from '../../../interfaces/doctor.interface';
import { Pagination } from '../../../interfaces/pagination.interface';
import { Doctor } from '../../../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  getDoctors(params: any): Observable<Pagination<Doctor>> {
    return this.http.get<Pagination<Doctor>>(`${environment.base_url}/doctor`, {
      headers: {
        'x-token': localStorage.getItem('token') || '',
      },
      params,
    });
  }

  getDoctor(id: string): Observable<IDoctor> {
    return this.http.get<IDoctor>(`${environment.base_url}/doctor/${id}`, {
      headers: {
        'x-token': localStorage.getItem('token') || '',
      },
    });
  }

  createDoctor(doctor: IDoctor): Observable<IDoctor> {
    return this.http.post<IDoctor>(`${environment.base_url}/doctor`, doctor, {
      headers: {
        'x-token': localStorage.getItem('token') || '',
      },
    });
  }

  updateDoctor(doctor: Doctor): Observable<IDoctor> {
    return this.http.put<IDoctor>(
      `${environment.base_url}/doctor/${doctor.id}`,
      doctor,
      {
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
      }
    );
  }

  deleteDoctor(id: string): Observable<IDoctor> {
    return this.http.delete<IDoctor>(`${environment.base_url}/doctor/${id}`, {
      headers: {
        'x-token': localStorage.getItem('token') || '',
      },
    });
  }
}
