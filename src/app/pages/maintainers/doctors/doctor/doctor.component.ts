import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDoctor } from 'src/app/pages/pages-shared/interfaces/doctor.interface';
import { Pagination } from 'src/app/pages/pages-shared/interfaces/pagination.interface';
import { Doctor } from 'src/app/pages/pages-shared/models/doctor.model';
import { Hospital } from 'src/app/pages/pages-shared/models/hospital.model';
import { DoctorService } from 'src/app/pages/pages-shared/providers/maintainers/doctor/doctor.service';
import { HospitalService } from 'src/app/pages/pages-shared/providers/maintainers/hospital/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
  doctorForm: FormGroup = new FormGroup({});
  hospitals: Hospital[] = [];
  imageSelectedHospital?: string = '';
  nameSelectedHospital?: string = '';
  selectedDoctor?: Doctor;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private hospitalService: HospitalService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.findHospitals();
    this.listenChangeRoute();
  }

  listenChangeRoute() {
    this.activateRoute.params.subscribe((params) => {
      if (params.id !== 'new') this.getDoctor(params.id);
    });
  }

  get name() {
    return this.doctorForm.get('name');
  }

  get validName() {
    return this.name?.invalid && (this.name?.dirty || this.name?.touched);
  }

  get hospital() {
    return this.doctorForm.get('hospitalId');
  }

  get validHospital() {
    return (
      this.hospital?.invalid && (this.hospital?.dirty || this.hospital?.touched)
    );
  }

  createForm() {
    this.doctorForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      hospitalId: ['', Validators.required],
    });
  }

  createDoctor() {
    this.doctorForm.markAllAsTouched();
    if (this.doctorForm.valid) {
      if (this.selectedDoctor) {
        this.doctorService
          .updateDoctor(this.doctorForm.value)
          .subscribe((res: IDoctor) => {
            Swal.fire('Updated', res.doctor.name, 'success');
          });
      } else {
        this.doctorService
          .createDoctor(this.doctorForm.value)
          .subscribe((res: IDoctor) => {
            Swal.fire('Created', this.name?.value, 'success');
            this.router.navigateByUrl(`/dashboard/doctors/${res.doctor.id}`);
          });
      }
    }
  }

  findHospitals() {
    this.hospitalService
      .findHospitals()
      .subscribe((res: Pagination<Hospital>) => {
        this.hospitals = res.data;
      });
  }

  changeHospital(event: any) {
    const hospitalId = event.target.value;
    this.setHospital(hospitalId);
  }

  setHospital(hospitalId: string) {
    const selectedHospital = this.hospitals.find(
      (hospital: Hospital) => hospital.id === hospitalId
    );
    this.nameSelectedHospital = selectedHospital?.name;
    this.imageSelectedHospital = selectedHospital?.image;
  }

  getDoctor(id: string) {
    this.doctorService.getDoctor(id).subscribe(
      (res: IDoctor) => {
        this.selectedDoctor = res.doctor;
        this.setHospital(res.doctor.hospitalId);
        this.setFormDoctor(res.doctor);
      },
      () => {
        Swal.fire(
          'Error',
          'An error occurred while retrieving the doctor',
          'error'
        ).then(() => {
          this.router.navigateByUrl('/dashboard/doctors');
        });
      }
    );
  }

  setFormDoctor(doctor: Doctor) {
    this.doctorForm.patchValue({
      id: doctor.id,
      name: doctor.name,
      hospitalId: doctor.hospitalId,
    });
  }
}
