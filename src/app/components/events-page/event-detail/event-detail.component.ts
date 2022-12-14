import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/interfaces/Event';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Helper } from 'src/app/shared/Helper';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  event!: Event | null;
  loading = false;
  error = '';
  hasError = false;
  banError = false;
  banMessage = '';
  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  id!: string;
  admin = false;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.admin = Helper.isAdmin();
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
    this.loading = true;
    console.log(form.value);
    const data = { eventId: this.id, comment: form.value.comment };
    this.eventService.addComment(data).subscribe(
      (res: any) => {
        this.hasError = false;
        this.loading = false;
        if (res.success) this.fetchComments();
        form.reset();
        // this.NotificationService.showSuccess('Uspjesno', 'TEST');
      },
      (error) => {
        this.hasError = true;
        this.loading = false;
        this.error =
          'Morate biti logovani da biste mogli komentarisati.\n Ukoliko ste logovani, dobili ste zabranu.';
      }
    );
  }
  banUser(id: string) {
    console.log('ban user id' + id);
    this.authService.banUser(id).subscribe(
      (res) => {
        console.log(res);
        this.banError = false;
        this.fetchComments();
      },
      (err) => {
        this.banError = true;
        this.banMessage = 'Ne mozete banovati sami sebe.';
      }
    );
  }
}
