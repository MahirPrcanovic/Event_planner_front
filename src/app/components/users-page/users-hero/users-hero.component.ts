import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { Helper } from 'src/app/shared/Helper';

@Component({
  selector: 'app-users-hero',
  templateUrl: './users-hero.component.html',
  styleUrls: ['./users-hero.component.css'],
})
export class UsersHeroComponent implements OnInit {
  constructor(private authService: AuthService) {}
  loggedUser: User | null = null;
  error = false;
  errorMsg = '';
  success = false;
  successMsg = '';
  loading = false;
  isAdmin = false;
  ngOnInit(): void {
    this.isAdmin = Helper.isAdmin();
    this.fetchUser();
  }
  fetchUser() {
    this.authService.getSingleUser(Helper.getUserID()).subscribe((res: any) => {
      this.loggedUser = res.item;
    });
  }
  changePassword(form: NgForm) {
    this.loading = true;
    if (form.value.newPassword !== form.value.passwordRepeat) {
      this.error = true;
      this.errorMsg = 'Passwords do not match.';
      this.loading = false;
      return;
    }
    const changePassObj = {
      currentPassword: form.value.currentPassword,
      newPassword: form.value.newPassword,
    };
    this.authService.changePass(changePassObj).subscribe(
      (res: any) => {
        this.error = false;
        this.success = true;
        this.loading = false;
        this.successMsg = 'Password successfully updated.';
        form.reset();
      },
      (err) => {
        this.error = true;
        this.success = false;
        this.loading = false;
        this.errorMsg = 'Please enter correct current password.';
      }
    );
  }
}
