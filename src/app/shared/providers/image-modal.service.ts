import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/auth-shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ImageModalService {
  private _hideModal: boolean = true;
  user!: User;
  id: string = '';
  type: string = '';
  image: string = '';

  constructor() {}

  get hideModal() {
    return this._hideModal;
  }

  openModal(user: User) {
    this._hideModal = false;
    this.user = user;
  }

  closeModal() {
    this._hideModal = true;
  }
}
