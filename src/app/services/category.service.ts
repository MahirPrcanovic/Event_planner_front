import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  fetchAll() {
    return this.http.get(environment.apiURL + 'category');
  }
  fetchSingle(id: string) {
    return this.http.get(environment.apiURL + 'category/' + id);
  }
  update(
    id: string,
    body: { name?: string; description?: string; pictureUrl?: string }
  ) {
    return this.http.patch(environment.apiURL + 'category/' + id, body);
  }
  addNew(body: { name?: string; description?: string; pictureUrl?: string }) {
    return this.http.post(environment.apiURL + 'category', body);
  }
}
