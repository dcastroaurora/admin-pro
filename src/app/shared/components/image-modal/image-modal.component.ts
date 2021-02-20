import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-shared/providers/auth.service';
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
    private fileService: FileService,
    private authService: AuthService
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
    const type = this.imageModalService.type;
    const idCollection = this.imageModalService.id;

    this.fileService.updatePicture(this.picture, type, idCollection).subscribe(
      (res: FileModel) => {
        Swal.fire('Saved', 'Updated picture', 'success');
        this.imageModalService.newImage.emit(res.fileName);
        this.checkImageLoggedUserUpdated(type, res.fileName, idCollection);
        this.closeModal();
      },
      (error) => {
        Swal.fire('Error', error.error.message, 'error');
      }
    );
  }

  checkImageLoggedUserUpdated(
    type: string,
    fileName: string,
    idCollection?: string
  ) {
    if (type === 'user' && idCollection === this.authService.user.id) {
      this.authService.user.image = fileName;
    }
  }
}
