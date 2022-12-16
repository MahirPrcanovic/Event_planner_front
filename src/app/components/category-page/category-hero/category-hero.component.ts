import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-hero',
  templateUrl: './category-hero.component.html',
  styleUrls: ['./category-hero.component.css'],
})
export class CategoryHeroComponent implements OnInit {
  categories: Category[] = [];
  activeUpdateID: string = '';
  activeUpdateCategory!: Category;
  @ViewChild('closeModal') closeModal!: ElementRef;
  isUpdate = false;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchLocations();
  }
  fetchLocations() {
    this.categoryService.fetchAll().subscribe((locations: any) => {
      this.categories = locations.data;
    });
  }
  fetchSingleCategory(id: string) {
    this.categoryService.fetchSingle(id).subscribe((location: any) => {
      this.activeUpdateCategory = location.item;
    });
  }
  update(id: string) {
    this.isUpdate = true;
    this.activeUpdateID = id;
    this.fetchSingleCategory(id);
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
      this.categoryService
        .update(this.activeUpdateID, updateBody)
        .subscribe((res: any) => {
          console.log(res);
          //Instead of fetching data again, just swap updatedItem with new data
          const inx = this.categories.findIndex(
            (el) => el.id == this.activeUpdateID
          );
          this.categories[inx] = res.item;
          this.closeModal.nativeElement.click();
          form.reset();
        });
      return;
    }
    updateBody.name = form.value.name;
    updateBody.description = form.value.description;
    updateBody.iconUrl = form.value.iconUrl;
    this.categoryService.addNew(updateBody).subscribe((res: any) => {
      console.log(res);
      this.categories.push(res.item);
      this.closeModal.nativeElement.click();
      form.reset();
    });
  }
}
