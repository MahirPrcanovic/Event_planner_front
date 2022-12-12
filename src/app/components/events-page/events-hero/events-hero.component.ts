import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events-hero',
  templateUrl: './events-hero.component.html',
  styleUrls: ['./events-hero.component.css'],
})
export class EventsHeroComponent implements OnInit {
  events: Event[] = [];
  loading = false;
  error = '';
  success = true;
  constructor(private eventService: EventsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.eventService.fetchAll().subscribe(
      (res: any) => {
        this.success = true;
        this.loading = false;
        this.events = res.data;
        console.log(res.data);
        console.log(res);
      },
      (err) => {
        this.success = true;
        this.error = err.error;
      }
    );
  }
}
