import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'COURSES',
      menus: [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          submenus: [
            {
              title: 'Main',
              url: '/',
            },
            {
              title: 'Progressbar',
              url: 'progress',
            },
            {
              title: 'Chart',
              url: 'chart',
            },
          ],
        },
        {
          title: 'Workshops',
          icon: 'mdi mdi-bullseye',
          submenus: [
            {
              title: 'Canvan',
              url: '/',
            },
            {
              title: 'TEA',
              url: '',
            },
            {
              title: 'Google Fonts',
              url: '',
            },
            {
              title: 'Comportamientos',
              url: '',
            },
          ],
        },
      ],
    },
    {
      title: 'MATERIALS',
      menus: [
        {
          title: 'Courses',
          icon: 'mdi mdi-gauge',
          submenus: [
            {
              title: 'Main',
              url: '/',
            },
            {
              title: 'Progressbar',
              url: 'progress',
            },
            {
              title: 'Chart',
              url: 'chart',
            },
          ],
        },
        {
          title: 'Videos',
          icon: 'mdi mdi-bullseye',
          submenus: [
            {
              title: 'Canvan',
              url: '/',
            },
            {
              title: 'TEA',
              url: '',
            },
            {
              title: 'Google Fonts',
              url: '',
            },
            {
              title: 'Comportamientos',
              url: '',
            },
          ],
        },
      ],
    },
  ];

  constructor() {}
}
