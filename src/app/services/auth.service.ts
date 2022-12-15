import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  admin: Subject<boolean> = new Subject<boolean>();
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
  banUser(id: string) {
    return this.http.patch(environment.apiURL + 'user/ban/' + id, {});
  }
  getSingleUser(id: string) {
    return this.http.get(environment.apiURL + 'user/' + id);
  }
}
