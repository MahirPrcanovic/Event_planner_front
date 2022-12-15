import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.fetchUser();
  }
  fetchUser() {
    this.authService.getSingleUser(Helper.getUserID()).subscribe((res: any) => {
      this.loggedUser = res.item;
    });
  }
}
