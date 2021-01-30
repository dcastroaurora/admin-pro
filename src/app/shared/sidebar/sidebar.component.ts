import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/pages/pages-shared/providers/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
  }
}
