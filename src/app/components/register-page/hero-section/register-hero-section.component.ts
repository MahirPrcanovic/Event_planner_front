import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'register-hero-section',
  templateUrl: './register-hero-section.component.html',
  styleUrls: ['./register-hero-section.component.css'],
})
export class RegisterHeroSection implements OnInit {
  constructor(private authService: AuthService) {}
  hasError = false;
  error = '';
  success = false;
  successMsg = '';
  loading = false;
  ngOnInit(): void {}
  register(form: NgForm) {
    this.loading = true;
    console.log(form.value);
    this.authService.register(form.value).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.success) {
          this.hasError = false;
          this.success = true;
          this.successMsg = res.message;
        }
      },
      (err) => {
        this.loading = false;
        this.success = false;
        this.error = err.error.message;
        this.hasError = true;
      }
    );
  }
}
