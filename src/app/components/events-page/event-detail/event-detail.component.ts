import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/interfaces/Event';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  event!: Event | null;
  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  id!: string;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id.trim() == '') this.router.navigate(['/events']);
    console.log(this.id);
    this.fetchComments();
  }
  fetchComments() {
    this.eventService.fetchSingle(this.id).subscribe((res: any) => {
      this.event = res.item;
      console.log(this.event);
    });
  }
  addComment(form: NgForm) {
    console.log(form.value);
    const data = { eventId: this.id, comment: form.value.comment };
    this.eventService.addComment(data).subscribe((res: any) => {
      if (res.success) this.fetchComments();
      form.reset();
    });
  }
}
