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
import { HttpClientModule } from '@angular/common/http';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { EventsModule } from './modules/events/events.module';
import { EventRouteComponent } from './routes/event-route/event-route.component';
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
