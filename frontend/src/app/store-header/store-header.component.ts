import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Category {
  value : String;
  viewValue : String;
}

@Component({
  selector: 'app-store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.css']
})
export class StoreHeaderComponent implements OnInit {

  
  filterToggled : Boolean;
  categoryList : String[];
  selectedCategory : Category;
  categories : FormControl;

  constructor() { 
    this.categories = new FormControl();
    this.filterToggled = false;
    this.categoryList = ["T-shirt","Dress","Skirt","Pants"];
    this.selectedCategory = {value:"All", viewValue:"All"};
  }

  ngOnInit(): void {
  }

  filterToggle(){
    this.filterToggled ? this.filterToggled = false : this.filterToggled = true;
  }
}
