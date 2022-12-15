import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingModule } from './modules/landing/landing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HeroSectionComponent } from './components/login-page/hero-section/hero-section.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterHeroSection } from './components/register-page/hero-section/register-hero-section.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRouteComponent } from './routes/login-route/auth-route.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { EventsModule } from './modules/events/events.module';
import { EventRouteComponent } from './routes/event-route/event-route.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AdminHeroComponent } from './components/admin-events-page/admin-hero/admin-hero.component';
import { LocationsPageComponent } from './pages/locations-page/locations-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { LocationHeroComponent } from './components/location-page/location-hero/location-hero.component';
import { CategoryHeroComponent } from './components/category-page/category-hero/category-hero.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersHeroComponent } from './components/users-page/users-hero/users-hero.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeroSectionComponent,
    RegisterPageComponent,
    RegisterHeroSection,
    AuthRouteComponent,
    AdminPageComponent,
    EventRouteComponent,
    AdminHeroComponent,
    LocationsPageComponent,
    CategoryPageComponent,
    LocationHeroComponent,
    CategoryHeroComponent,
    UsersPageComponent,
    UsersHeroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    EventsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
