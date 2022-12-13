import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}
  fetchAll() {
    return this.http.get(environment.apiURL + 'event');
  }
  fetchSingle(id: string) {
    return this.http.get(environment.apiURL + 'event/' + id);
  }
  addComment(data: { eventId: string; comment: string }) {
    return this.http.put(environment.apiURL + 'comment/' + data.eventId, {
      comment: data.comment,
    });
  }
}
