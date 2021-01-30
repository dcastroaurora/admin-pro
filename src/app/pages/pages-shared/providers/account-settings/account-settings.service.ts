import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountSettingsService {
  private linkTheme = document.querySelector('#theme');
  links?: NodeListOf<Element>;

  constructor() {
    this.setTheme();
  }

  setTheme() {
    const url =
      localStorage.getItem('urlTheme') ??
      './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', url);
  }

  setCheckTheme() {
    this.links = document.querySelectorAll('.selector');
    const lsTheme = localStorage.getItem('theme');
    this.links.forEach((item) => {
      const theme = item.getAttribute('data-theme');
      if (theme == lsTheme) item.classList.add('working');
    });
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('urlTheme', url);
    localStorage.setItem('theme', theme);
    this.checkCurrentTheme(theme);
  }

  checkCurrentTheme(theme: string) {
    this.links?.forEach((item) => {
      item.classList.remove('working');
      const themeColor = item.getAttribute('data-theme');
      if (theme == themeColor) item.classList.add('working');
    });
  }
}
