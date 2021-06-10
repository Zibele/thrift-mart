import { Injectable } from '@angular/core';
import {Product} from './models/product';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly DJANGO_SERVER = "http://127.0.0.1:8000";

  constructor(private httpClient : HttpClient) { }


  readProducts() : Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.DJANGO_SERVER}/api/products`);
  }



}
