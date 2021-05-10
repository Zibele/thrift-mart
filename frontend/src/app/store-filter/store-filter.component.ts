import { Component, OnInit ,Input} from '@angular/core';

import { FormControl } from '@angular/forms';
import { BreakpointObserver, BreakpointState, Breakpoints} from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

interface Option {
  value : any;
  viewValue : String;
}

@Component({
  selector: 'app-store-filter',
  templateUrl: './store-filter.component.html',
  styleUrls: ['./store-filter.component.css']
})

export class StoreFilterComponent implements OnInit {

  @Input() isMobile = false;
  filterToggled = false;
  categories = new FormControl();
  sub = new Subscription();

  

  categoryList : Option[]= [

      {value:"t-shirt", viewValue:"T-shirt"},
      {value:"dress", viewValue:"Dress"},
      {value:"pants", viewValue:"Pants"}

  ];
  
  priceList : Option[] = [

    {value: 0 , viewValue:"Any"},
    {value: 350 , viewValue:"R350"},
    {value: 500 , viewValue:"R500"},
    {value: 750 , viewValue:"R750"},
    {value: 1000, viewValue:"R1000"}

  ];

  constructor(private breakpointObserver : BreakpointObserver) { 
  }

  ngOnInit(): void {

  }

  filterToggle(){
    console.log(`Is mobile ${this.isMobile}`);
    this.filterToggled ? this.filterToggled = false : this.filterToggled = true;
  }

}
