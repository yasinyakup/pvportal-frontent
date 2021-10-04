import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  AUTH_API= "http://localhost:8081/api/test/";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.AUTH_API+'users');  }
}
