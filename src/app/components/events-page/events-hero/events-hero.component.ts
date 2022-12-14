import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { Location } from 'src/app/interfaces/Location';
import { Category } from 'src/app/interfaces/Category';
import { LocationService } from 'src/app/services/location.service';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';
import { Event } from 'src/app/interfaces/Event';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-events-hero',
  templateUrl: './events-hero.component.html',
  styleUrls: ['./events-hero.component.css'],
})
export class EventsHeroComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  @ViewChild('closeModal') closeModal!: ElementRef;
  loading = false;
  error = null;
  success = true;
  queryParams = { location: '', category: '', search: '' };
  locations: Location[] = [];
  categories: Category[] = [];
  qSub!: Subscription;
  text: string = '';
  text2: string = '';
  admin = false;
  activeModalID = '';
  activeModalEvent: Event | null = null;
  updateError = false;
  constructor(
    private eventService: EventsService,
    private locationService: LocationService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.getDecodedAccessToken(localStorage.getItem('token'));
    if (token) {
      if (token.role === 'ADMIN') {
        this.admin = true;
        this.authService.admin.next(true);
      }
    }
    this.authService.admin.subscribe((val) => {
      this.admin = val;
    });
    console.log('ADMIN JE : ' + this.admin);
    this.loading = true;
    this.qSub = this.route.queryParams.subscribe((params) => {
      this.queryParams.category = params['category'] || '';
      this.queryParams.location = params['location'] || '';
      this.queryParams.search = params['search'] || '';
      this.fetchEvents();
    });
    this.categoryService.fetchAll().subscribe((res: any) => {
      this.categories = res.data;
    });
    this.locationService.fetchAll().subscribe((res: any) => {
      this.locations = res.data;
    });
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
  showModal(id: string) {
    console.log('ID JE : ' + id);
    this.activeModalID = id;
    this.eventService.fetchSingle(this.activeModalID).subscribe((res: any) => {
      this.activeModalEvent = res.item;
    });
  }
  searchEvents(form: NgForm) {
    console.log(form.value);
    const qParams = {
      location:
        this.locations.find((e) => e.name === form.value.location)?.id || '',
      category:
        this.categories.find((e) => e.name === form.value.category)?.id || '',
      search: form.value.search,
    };
    this.router.navigate(['event'], { queryParams: qParams });
    this.queryParams = qParams;
  }
  updateEvent(form: NgForm) {
    const updateBody: any = {};
    console.log(form.value);

    form.value.name && form.value.name.trim() !== ''
      ? (updateBody.name = form.value.name)
      : '';
    form.value.description && form.value.description.trim() !== ''
      ? (updateBody.description = form.value.description)
      : '';
    form.value.date && form.value.date.trim() !== ''
      ? (updateBody.date = form.value.date)
      : '';
    form.value.pictureUrl && form.value.pictureUrl.trim() !== ''
      ? (updateBody.pictureUrl = form.value.pictureUrl)
      : '';
    form.value.location && form.value.location.trim() !== ''
      ? (updateBody.locationID = this.locations.find(
          (l) => l.name == form.value.location
        )?.id)
      : '';
    form.value.category && form.value.category.trim() !== ''
      ? (updateBody.categoryID = this.categories.find(
          (l) => l.name == form.value.category
        )?.id)
      : '';
    console.log('Za poslati obj');
    console.log(updateBody);
    this.eventService.updateEvent(this.activeModalID, updateBody).subscribe(
      (res: any) => {
        console.log(res);
        form.reset();
        const id = this.events.findIndex((ev) => ev.id == this.activeModalID);
        this.events[id] = res.item;
        this.closeModal.nativeElement.click();
      },
      (err) => {
        this.updateError = true;
      }
    );
  }
  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  ngOnDestroy(): void {
    this.qSub.unsubscribe();
  }
}
