import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  AUTH_API= "http://localhost:8081/api/auth/";
  

  constructor(private http: HttpClient) { }


  checkAuthenticated(): any {
    
  }

  login(userName: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'login', {
      userName,
      password
    }, httpOptions);
  }

  register(userName: string, email: string,firstName: String, lastName:String, password: string, empCode: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'signup', {
      userName,
      email,
      firstName,
      lastName,
      password,
      empCode
    }, httpOptions);
  }

}
