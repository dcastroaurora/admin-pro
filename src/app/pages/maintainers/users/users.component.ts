import { Component, OnInit } from '@angular/core';
import { IAuth } from 'src/app/auth/auth-shared/interfaces/auth.interface';
import { User } from 'src/app/auth/auth-shared/models/user.model';
import { AuthService } from 'src/app/auth/auth-shared/providers/auth.service';
import { ImageModalService } from 'src/app/shared/providers/image-modal.service';
import Swal from 'sweetalert2';
import { Pagination } from '../../pages-shared/interfaces/pagination.interface';
import { UserService } from '../../pages-shared/providers/maintainers/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  name: string = '';
  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [3, 6, 9];
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private imageModalService: ImageModalService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService
      .getUsers({ name: this.name, size: this.pageSize, page: this.page })
      .subscribe(
        (res: Pagination) => {
          const { users, totalItems } = res;
          this.users = users;
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
    this.getUsers();
  }

  handlePageSizeChange(event: any) {
    if (event.target.value > 0) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.getUsers();
    }
  }

  deleteUser(user: User) {
    if (user.id === this.authService.user.id) {
      Swal.fire('Warning', 'You cannot delete your own user', 'warning');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `Deleting the user ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((res) => {
      if (res.value) {
        this.userService.deleteUser(user.id).subscribe(() => {
          Swal.fire('Deleted', `User ${user.name} has been deleted`, 'success');
          this.getUsers();
        });
      }
    });
  }

  changeRole(user: User) {
    delete user.password;
    this.authService.updateProfile(user).subscribe((res: IAuth) => {
      console.log(res);
    });
  }

  openModal(user: User) {
    this.imageModalService.openModal(user);
  }
}
