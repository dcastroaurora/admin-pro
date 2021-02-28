import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu = [];

  constructor() {}

  chargeMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];
  }
}
