import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';
@Component({
  selector: 'login-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent implements OnInit {
  error = '';
  hasError = false;

  credentials = { username: '', password: '', rememberMe: false };
  constructor(private AuthService: AuthService, private router: Router) {}
  loading = false;
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      const objec = this.getDecodedAccessToken(localStorage.getItem('token'));
      if (objec.role == 'ADMIN') this.router.navigate(['event']);
      else if (objec.role == 'USER') this.router.navigate(['event']);
      this.AuthService.admin.next(objec.role == 'ADMIN' ? true : false);
    }
  }
  onSubmit(form: NgForm) {
    this.loading = true;
    this.credentials.username = form.value.username;
    this.credentials.password = form.value.password;
    this.credentials.rememberMe = form.value.rememberMe;
    this.AuthService.login(this.credentials).subscribe(
      (res: any) => {
        this.loading = false;
        this.hasError = false;
        if (res.role == 'ADMIN') this.router.navigate(['event']);
        else if (res.role == 'USER') this.router.navigate(['event']);
        else this.router.navigate(['login']);
        if (form.value.rememberMe) {
          localStorage.setItem('token', res.token);
        }
        this.AuthService.admin.next(res.role == 'ADMIN' ? true : false);
      },
      (error: any) => {
        this.loading = false;
        this.hasError = true;
        this.error = error.error;
      }
    );
  }
  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
