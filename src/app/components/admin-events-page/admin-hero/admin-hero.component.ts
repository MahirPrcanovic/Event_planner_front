import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/interfaces/Event';
import { EventsService } from 'src/app/services/events.service';
@Component({
  selector: 'app-admin-hero',
  templateUrl: './admin-hero.component.html',
  styleUrls: ['./admin-hero.component.css'],
})
export class AdminHeroComponent implements OnInit {
  events: Event[] = [];
  constructor(private eventService: EventsService) {}
  error = null;
  success = false;
  loading = false;
  queryParams = { location: '', category: '', search: '' };
  ngOnInit(): void {
    this.fetchEvents();
  }
  fetchEvents() {
    this.eventService.fetchAll(this.queryParams).subscribe(
      (res: any) => {
        this.error = null;
        this.success = true;
        this.loading = false;
        this.events = res.data;
        console.log(res.data);
        console.log(res);
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.success = true;
        this.error = err.error.message;
      }
    );
  }
}
