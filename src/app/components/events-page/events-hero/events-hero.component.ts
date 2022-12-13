import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { Location } from 'src/app/interfaces/Location';
import { Category } from 'src/app/interfaces/Category';
import { LocationService } from 'src/app/services/location.service';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-events-hero',
  templateUrl: './events-hero.component.html',
  styleUrls: ['./events-hero.component.css'],
})
export class EventsHeroComponent implements OnInit, OnDestroy {
  events: Event[] = [];
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
  constructor(
    private eventService: EventsService,
    private locationService: LocationService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.admin.subscribe((val) => {
      this.admin = val;
    });
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
  ngOnDestroy(): void {
    this.qSub.unsubscribe();
  }
}
