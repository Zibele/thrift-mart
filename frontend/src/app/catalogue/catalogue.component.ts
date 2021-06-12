import { Component, OnInit ,Input} from '@angular/core';
import { ApiService } from '../api.service';
import {Product} from '../models/product';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  @Input() isMobile = false;
  Products : Product[] = [];

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {

    this.apiService.readProducts().subscribe( Products  => {
      this.Products = Products;
      
      console.log(Products);

    }, err => {
      console.log(err);
    });
      
  }

}
