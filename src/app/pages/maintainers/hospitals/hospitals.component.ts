import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageModalService } from 'src/app/shared/providers/image-modal.service';
import Swal from 'sweetalert2';
import { IHospital } from '../../pages-shared/interfaces/hospital.interface';
import { Pagination } from '../../pages-shared/interfaces/pagination.interface';
import { Hospital } from '../../pages-shared/models/hospital.model';
import { HospitalService } from '../../pages-shared/providers/maintainers/hospital/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss'],
})
export class HospitalsComponent implements OnInit {
  hospitals: Hospital[] = [];
  name: string = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [3, 6, 9];
  loading: boolean = false;
  imageSubscription: Subscription = new Subscription();

  constructor(
    private hospitalService: HospitalService,
    private imageModalService: ImageModalService
  ) {}

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getHospitals();
    this.changeImageListener();
  }

  changeImageListener() {
    this.imageSubscription = this.imageModalService.newImage.subscribe(() => {
      this.getHospitals();
    });
  }

  getHospitals() {
    this.loading = true;
    this.hospitalService
      .getHospitals({ name: this.name, size: this.pageSize, page: this.page })
      .subscribe(
        (res: Pagination<Hospital>) => {
          const { data, totalItems } = res;
          this.hospitals = data;
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
    this.getHospitals();
  }

  handlePageSizeChange(event: any) {
    if (event.target.value > 0) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.getHospitals();
    }
  }

  updateHospital(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital)
      .subscribe((res: IHospital) => {
        Swal.fire('Updated', res.hospital.name, 'success');
      });
  }

  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Deleting the hospital ${hospital.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((res) => {
      if (res.value) {
        this.hospitalService.deleteHospital(hospital.id).subscribe(() => {
          Swal.fire(
            'Deleted',
            `Hospital ${hospital.name} has been deleted`,
            'success'
          );
          this.getHospitals();
        });
      }
    });
  }

  async createHospital() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Register Hospital',
      input: 'text',
      inputPlaceholder: 'Enter name',
      showCancelButton: true,
    });

    if (value!.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe((res: IHospital) => {
        this.hospitals.push(res.hospital);
      });
    }
  }

  openModal(hospital: Hospital) {
    this.imageModalService.openModal('hospital', hospital.image, hospital.id);
  }
}
