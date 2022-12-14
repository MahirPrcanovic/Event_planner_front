import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from 'src/app/interfaces/Location';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-hero',
  templateUrl: './location-hero.component.html',
  styleUrls: ['./location-hero.component.css'],
})
export class LocationHeroComponent implements OnInit {
  locations: Location[] = [];
  activeUpdateID: string = '';
  activeUpdateLocation!: Location;
  @ViewChild('closeModal') closeModal!: ElementRef;
  isUpdate = false;
  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.fetchLocations();
  }
  fetchLocations() {
    this.locationService.fetchAll().subscribe((locations: any) => {
      this.locations = locations.data;
    });
  }
  fetchSingleLocation(id: string) {
    this.locationService.fetchSingle(id).subscribe((location: any) => {
      this.activeUpdateLocation = location.item;
    });
  }
  update(id: string) {
    this.isUpdate = true;
    this.activeUpdateID = id;
    this.fetchSingleLocation(id);
  }
  setActive() {
    this.isUpdate = false;
  }
  addLocation(form: NgForm) {
    console.log(form.value);
    const updateBody: any = {};
    if (this.isUpdate) {
      form.value.description && form.value.description.trim() !== ''
        ? (updateBody.description = form.value.description)
        : '';
      form.value.name && form.value.name.trim() !== ''
        ? (updateBody.name = form.value.name)
        : '';
      form.value.pictureUrl && form.value.pictureUrl.trim() !== ''
        ? (updateBody.pictureUrl = form.value.pictureUrl)
        : '';
      this.locationService
        .update(this.activeUpdateID, updateBody)
        .subscribe((res: any) => {
          console.log(res);
          //Instead of fetching data again, just swap updatedItem with new data
          const inx = this.locations.findIndex(
            (el) => el.id == this.activeUpdateID
          );
          this.locations[inx] = res.item;
          this.closeModal.nativeElement.click();
          form.reset();
        });
      return;
    }
    updateBody.name = form.value.name;
    updateBody.description = form.value.description;
    updateBody.pictureUrl = form.value.pictureUrl;
    this.locationService.addNew(updateBody).subscribe((res: any) => {
      console.log(res);
      this.locations.push(res.item);
      this.closeModal.nativeElement.click();
      form.reset();
    });
  }
}
