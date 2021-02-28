import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageModalService } from 'src/app/shared/providers/image-modal.service';
import Swal from 'sweetalert2';
import { Pagination } from '../../pages-shared/interfaces/pagination.interface';
import { Doctor } from '../../pages-shared/models/doctor.model';
import { DoctorService } from '../../pages-shared/providers/maintainers/doctor/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  doctors: Doctor[] = [];
  name: string = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [3, 6, 9];
  loading: boolean = false;
  imageSubscription: Subscription = new Subscription();

  constructor(
    private doctorService: DoctorService,
    private imageModalService: ImageModalService
  ) {}
  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getDoctors();
    this.changeImageListener();
  }

  changeImageListener() {
    this.imageSubscription = this.imageModalService.newImage.subscribe(() => {
      this.getDoctors();
    });
  }

  getDoctors() {
    this.loading = true;
    this.doctorService
      .getDoctors({ name: this.name, size: this.pageSize, page: this.page })
      .subscribe(
        (res: Pagination<Doctor>) => {
          const { data, totalItems } = res;
          this.doctors = data;
          this.count = totalItems;
          this.loading = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getDoctors();
  }

  handlePageSizeChange(event: any) {
    if (event.target.value > 0) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.getDoctors();
    }
  }

  deleteDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Deleting the doctor ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((res) => {
      if (res.value) {
        this.doctorService.deleteDoctor(doctor.id).subscribe(() => {
          Swal.fire(
            'Deleted',
            `Doctor ${doctor.name} has been deleted`,
            'success'
          );
          this.getDoctors();
        });
      }
    });
  }

  openModal(doctor: Doctor) {
    this.imageModalService.openModal('doctor', doctor.image, doctor.id);
  }
}
