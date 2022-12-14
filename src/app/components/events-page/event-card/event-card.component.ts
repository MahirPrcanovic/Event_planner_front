import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { TokenService } from 'src/app/services/token.service';
import { Event } from 'src/app/interfaces/Event';
import { EventsService } from 'src/app/services/events.service';
@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit {
  @Input() event!: Event;
  @Input() eventID!: string;
  // @Output() nekiEvent = new EventEmitter<string>();
  constructor(
    private tokenService: TokenService,
    private eventService: EventsService
  ) {}
  admin: boolean = false;
  activeModalID: string | null = null;
  activeModalEvent: any;
  show = false;
  ngOnInit(): void {
    const obj = localStorage.getItem('token');
    if (obj) {
      const tokenData = this.getDecodedAccessToken(obj);
      console.log('Token vrijedi za : ' + tokenData);
      if (tokenData.role == 'ADMIN') {
        this.tokenService.admin.next(true);
        this.admin = true;
      }
    }
  }
  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  fetchEvent(id: string) {
    this.eventService.fetchSingle(id).subscribe((res: any) => {
      console.log(res);
      this.activeModalEvent = res.item;
      // this.nekiEvent.emit(res.item);
      console.log(
        'active element' +
          this.activeModalEvent.name +
          '_' +
          this.activeModalEvent.id
      );
    });
  }
  // changeID(id: string) {
  //   this.nekiEvent.emit(id);
  //   this.activeModalID = id;
  //   console.log(id);
  //   this.fetchEvent(id);
  //   this.show = true;
  // }
}
