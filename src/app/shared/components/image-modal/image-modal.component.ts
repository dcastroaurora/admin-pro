import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/auth/auth-shared/models/user.model';
import Swal from 'sweetalert2';
import { FileModel } from '../../models/file.model';
import { FileService } from '../../providers/file.service';
import { ImageModalService } from '../../providers/image-modal.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  picture!: File;
  pictureTemp: any;

  constructor(
    public imageModalService: ImageModalService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.pictureTemp = null;
    this.fileInput.nativeElement.value = '';
    this.imageModalService.closeModal();
  }

  changePicture(event: any) {
    this.picture = event.target.files[0];

    if (!this.picture) {
      this.pictureTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.picture);

    reader.onloadend = () => {
      this.pictureTemp = reader.result;
    };
  }

  uploadPicture() {
    this.fileService
      .updatePicture(this.picture, 'user', this.imageModalService.user.id)
      .subscribe(
        (res: FileModel) => {
          this.imageModalService.user.image = res.fileName;
          Swal.fire('Saved', 'Updated picture', 'success');
        },
        (error) => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }
}
