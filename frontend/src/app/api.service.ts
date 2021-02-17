import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product }  from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  PHP_API_SERVER = "http://127.0.0.1:8080";

  readProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }
}
