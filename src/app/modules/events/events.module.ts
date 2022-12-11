import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsPageComponent } from 'src/app/pages/events-page/events-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LandingModule } from '../landing/landing.module';

@NgModule({
  declarations: [EventsPageComponent],
  exports: [EventsPageComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, LandingModule],
})
export class EventsModule {}
