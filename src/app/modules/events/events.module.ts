import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { EventsPageComponent } from 'src/app/pages/events-page/events-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LandingModule } from '../landing/landing.module';
import { EventCardComponent } from 'src/app/components/events-page/event-card/event-card.component';
import { EventsHeroComponent } from 'src/app/components/events-page/events-hero/events-hero.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EventsPageComponent, EventCardComponent, EventsHeroComponent],
  exports: [EventsPageComponent, EventCardComponent, EventsHeroComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    LandingModule,
    NgOptimizedImage,
    RouterModule,
  ],
})
export class EventsModule {}
