import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  products : Product[] | undefined;

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    
    this.apiService.readProducts().subscribe( 
      
      products => {

        this.products = products;
        console.log(products);

      }, err =>{
        
        console.log(err);

      }
      
    );

}
}
