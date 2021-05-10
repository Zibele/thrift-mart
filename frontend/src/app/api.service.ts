import { Injectable } from '@angular/core';
import {Item} from './models/item';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly PHP_SERVER = "http://127.0.0.1:8080";

  constructor(private httpClient : HttpClient) { }


  readItems() : Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this.PHP_SERVER}/api/read.php`);
  }



}
