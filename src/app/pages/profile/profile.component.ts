import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/auth-shared/interfaces/user.interface';
import { UserModel } from 'src/app/auth/auth-shared/models/user.model';
import { UserService } from 'src/app/auth/auth-shared/providers/user.service';
import { FileModel } from 'src/app/shared/models/file.model';
import { FileService } from 'src/app/shared/providers/file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({});
  picture!: File;
  user!: User;
  pictureTemp: any;

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private fileService: FileService
  ) {
    this.setUserData();
  }

  ngOnInit(): void {
    this.createProfileForm();
    // this.urlPicture = this.userService.getUserImage();
  }

  setUserData() {
    this.user = this.userService.user;
  }

  createProfileForm() {
    this.profileForm = this.fb.group({
      id: [this.user.id],
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      role: [this.user.role],
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value).subscribe(
      (res: UserModel) => {
        const { name, email } = res.user;
        this.user.name = name;
        this.user.email = email;

        Swal.fire('Saved', 'Updated profile', 'success');
      },
      (error) => {
        console.log(error.error);
        Swal.fire('Error', error.error.message, 'error');
      }
    );
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
      .updatePicture(this.picture, 'user', this.user.id)
      .subscribe(
        (res: FileModel) => {
          this.user.image = res.fileName;
          Swal.fire('Saved', 'Updated picture', 'success');
        },
        (error) => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
  }
}
