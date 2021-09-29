import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://127.0.0.1:5000/user';


let httpHeaders= new HttpHeaders();
var token = localStorage.getItem('token');
httpHeaders.append('Content-Type', 'application/json');
httpHeaders.append("Authorization", "x-access-tokens:" + token);

const httpOptions = {
  headers: httpHeaders
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl, httpOptions);
  }

  get(id: any): Observable<User> {
    return this.http.get(`${baseUrl}/${id}`, httpOptions);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data, httpOptions);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data, httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, httpOptions);
  }

  findByName(email: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}?email=${email}`, httpOptions);
  }
}
