import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'login-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent implements OnInit {
  error = '';
  hasError = false;
  credentials = { username: '', password: '' };
  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const objec = this.getDecodedAccessToken(localStorage.getItem('token'));
    if (objec.role == 'ADMIN') this.router.navigate(['admin/events']);
    else if (objec.role == 'USER') this.router.navigate(['events']);
  }
  onSubmit(form: NgForm) {
    this.credentials.username = form.value.username;
    this.credentials.password = form.value.password;
    this.AuthService.login(this.credentials).subscribe(
      (res: any) => {
        this.hasError = false;
        if (res.role == 'ADMIN') this.router.navigate(['admin/events']);
        else if (res.role == 'USER') this.router.navigate(['events']);
        else this.router.navigate(['login']);
        if (form.value.rememberMe) {
          localStorage.setItem('token', res.token);
        }
      },
      (error: any) => {
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
