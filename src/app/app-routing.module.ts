import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthRouteComponent } from './routes/login-route/auth-route.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';

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
    path: 'events',
    component: EventsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
