import { Component, OnInit } from '@angular/core';
declare function customInitFunction(): any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    customInitFunction();
  }
}
