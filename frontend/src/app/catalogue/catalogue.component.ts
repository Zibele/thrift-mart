import { Component, OnInit ,Input} from '@angular/core';
import { ApiService } from '../api.service';
import {Item} from '../models/item';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  @Input() isMobile = false;
  items : Item[] = [];

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {

    this.apiService.readItems().subscribe( items  => {
      this.items = items;
      console.log(items);

    }, err => {
      console.log(err);
    });
      
  }

}
