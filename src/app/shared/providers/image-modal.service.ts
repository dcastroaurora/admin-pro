import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageModalService {
  private _hideModal: boolean = true;
  id?: string = '';
  type: string = '';
  image?: string = '';
  newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  get hideModal() {
    return this._hideModal;
  }

  openModal(type: string, image?: string, id?: string) {
    this._hideModal = false;
    this.id = id;
    this.type = type;
    this.image = image;
  }

  closeModal() {
    this._hideModal = true;
  }
}
