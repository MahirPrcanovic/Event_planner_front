import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}
  fetchAll() {
    return this.http.get(environment.apiURL + 'location');
  }
  fetchSingle(id: string) {
    return this.http.get(environment.apiURL + 'location/' + id);
  }
  update(
    id: string,
    body: { name?: string; description?: string; pictureUrl?: string }
  ) {
    return this.http.patch(environment.apiURL + 'location/' + id, body);
  }
  addNew(body: { name?: string; description?: string; pictureUrl?: string }) {
    return this.http.post(environment.apiURL + 'location', body);
  }
}
