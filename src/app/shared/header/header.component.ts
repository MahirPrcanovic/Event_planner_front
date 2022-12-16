import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Helper } from '../Helper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  admin = false;
  loggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.admin = Helper.isAdmin();
    this.loggedIn = localStorage.getItem('token') ? true : false;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
