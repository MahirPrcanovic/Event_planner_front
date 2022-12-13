import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated = new Subject<boolean>();
  constructor(private http: HttpClient) {}
  login(credentials: {
    username: string;
    password: string;
    rememberMe: boolean;
  }) {
    return this.http.post('http://localhost:8080/user/login', credentials);
  }
  register(data: {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
  }) {
    return this.http.post('http://localhost:8080/user/save', data);
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
