import { Component, OnInit } from '@angular/core';
import { Helper } from '../Helper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  admin = false;
  loggedIn = false;
  constructor() {}

  ngOnInit(): void {
    this.admin = Helper.isAdmin();
    this.loggedIn = localStorage.getItem('token') ? true : false;
  }
}
