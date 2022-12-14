import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthRouteComponent } from './routes/login-route/auth-route.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { EventRouteComponent } from './routes/event-route/event-route.component';
import { EventDetailComponent } from './components/events-page/event-detail/event-detail.component';
import { LocationsPageComponent } from './pages/locations-page/locations-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthRouteComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
    ],
  },
  {
    path: 'admin/events',
    component: AdminPageComponent,
  },
  {
    path: 'event',
    component: EventRouteComponent,
    children: [
      { path: '', component: EventsPageComponent },
      { path: ':id', component: EventDetailComponent },
    ],
  },
  {
    path: 'location',
    component: LocationsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
