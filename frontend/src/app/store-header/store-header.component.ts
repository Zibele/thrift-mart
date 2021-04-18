import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.css']
})
export class StoreHeaderComponent implements OnInit {

  public filterToggled : Boolean;
  
  constructor() { 
    this.filterToggled = false;
  }

  ngOnInit(): void {
  }

  filterToggle(){
    this.filterToggled ? this.filterToggled = false : this.filterToggled = true;
  }
}
