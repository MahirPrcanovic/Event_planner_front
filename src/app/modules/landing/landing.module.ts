import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from 'src/app/components/landing-page/hero-section/hero-section.component';
import { MoreInfoComponent } from 'src/app/components/landing-page/more-info/more-info.component';
import { SubscribeComponent } from 'src/app/components/landing-page/subscribe/subscribe.component';
import { LandingPageComponent } from 'src/app/pages/landing-page/landing-page.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    HeroSectionComponent,
    MoreInfoComponent,
    SubscribeComponent,
    LandingPageComponent,
    FooterComponent,
    HeaderComponent,
  ],
  exports: [
    HeroSectionComponent,
    MoreInfoComponent,
    SubscribeComponent,
    LandingPageComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class LandingModule {}
