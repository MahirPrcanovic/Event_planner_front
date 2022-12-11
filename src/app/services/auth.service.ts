import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated = new Subject<boolean>();
  constructor(private http: HttpClient) {}
  login(credentials: { username: string; password: string }) {
    return this.http.post('http://localhost:8080/user/login', {
      username: credentials.username,
      password: credentials.password,
    });
  }
  register(data: {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
  }) {
    return this.http.post('http://localhost:8080/user/save', data);
  }
}
