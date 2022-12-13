import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}
  fetchAll(queryParams: {
    location: string;
    category: string;
    search: string;
  }) {
    let params = new HttpParams();
    // params = params.append('page', queryParams.page);
    // params = params.append('pageSize', queryParams.pageSize);
    // console.log(queryParams);
    if (queryParams.search != '' && queryParams.search) {
      params = params.append('search', queryParams.search);
    }
    if (queryParams.location != '' && queryParams.location) {
      params = params.append('location', queryParams.location);
    }
    if (queryParams.category != '' && queryParams.category) {
      params = params.append('category', queryParams.category);
    }
    return this.http.get(environment.apiURL + 'event', {
      params: params,
    });
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
