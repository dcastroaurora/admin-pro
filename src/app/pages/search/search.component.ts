import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/auth/auth-shared/models/user.model';
import { Pagination } from '../pages-shared/interfaces/pagination.interface';
import { Doctor } from '../pages-shared/models/doctor.model';
import { Hospital } from '../pages-shared/models/hospital.model';
import { DoctorService } from '../pages-shared/providers/maintainers/doctor/doctor.service';
import { HospitalService } from '../pages-shared/providers/maintainers/hospital/hospital.service';
import { UserService } from '../pages-shared/providers/maintainers/user/user.service';
import { SearchService } from '../pages-shared/providers/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  users: User[] = [];
  hospitals: Hospital[] = [];
  doctors: Doctor[] = [];
  pageUser = 1;
  pageDoctor = 1;
  pageHospital = 1;
  countUser = 0;
  countDoctor = 0;
  countHospital = 0;
  pageSizeUser = 5;
  pageSizeHospital = 5;
  pageSizeDoctor = 5;
  pageSizes = [3, 6, 9];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searService: SearchService,
    private userService: UserService,
    private hospitalService: HospitalService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params.value);
      this.getSearches(params.value);
    });
  }

  getSearches(value: string) {
    this.searService.getSearches({ name: value }).subscribe((res: any) => {
      console.log(res);
      this.users = res.users.data;
      this.countUser = res.users.totalItems;
      this.hospitals = res.hospitals.data;
      this.countHospital = res.hospitals.totalItems;
      this.doctors = res.doctors.data;
      this.countDoctor = res.doctors.totalItems;
    });
  }

  getUsers() {
    this.userService
      .getUsers({ size: this.pageSizeUser, page: this.pageUser })
      .subscribe(
        (res: Pagination<User>) => {
          const { data, totalItems } = res;
          this.users = data;
          this.countUser = totalItems;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getHospitals() {
    this.hospitalService
      .getHospitals({ size: this.pageSizeHospital, page: this.pageHospital })
      .subscribe(
        (res: Pagination<Hospital>) => {
          const { data, totalItems } = res;
          this.hospitals = data;
          this.countHospital = totalItems;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getDoctors() {
    this.doctorService
      .getDoctors({ size: this.pageSizeDoctor, page: this.pageDoctor })
      .subscribe(
        (res: Pagination<Doctor>) => {
          const { data, totalItems } = res;
          this.doctors = data;
          this.countDoctor = totalItems;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  handlePageChangeUser(event: number): void {
    this.pageUser = event;
    this.getUsers();
  }

  handlePageSizeChangeUser(event: any) {
    if (event.target.value > 0) {
      this.pageSizeUser = event.target.value;
      this.pageUser = 1;
      this.getUsers();
    }
  }

  handlePageChangeHospital(event: number): void {
    this.pageHospital = event;
    this.getHospitals();
  }

  handlePageSizeChangeHospital(event: any) {
    if (event.target.value > 0) {
      this.pageSizeHospital = event.target.value;
      this.pageHospital = 1;
      this.getHospitals();
    }
  }

  handlePageChangeDoctor(event: number): void {
    this.pageDoctor = event;
    this.getDoctors();
  }

  handlePageSizeChangeDoctor(event: any) {
    if (event.target.value > 0) {
      this.pageSizeDoctor = event.target.value;
      this.pageDoctor = 1;
      this.getDoctors();
    }
  }
}
