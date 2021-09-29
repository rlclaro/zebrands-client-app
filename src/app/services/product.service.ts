import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { TokenStorageService } from './token-storage.service';

const baseUrl = 'http://127.0.0.1:5000/products';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  gethttpOptions(): any{
    let token = this.tokenStorage.getToken();
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-tokens':  token != null ? token : ""
      })
    };
    return httpOptions;
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl);
  }

  get(sku: any): Observable<Product> {
    return this.http.get(`${baseUrl}/sku/${sku}`, { headers: this.gethttpOptions() });
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data, { headers: this.gethttpOptions() });
  }

  update(sku: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}`, data, { headers: this.gethttpOptions() });
  }

  delete(sku: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${sku}`, { headers: this.gethttpOptions() });
  }

  findByName(name: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/name/${name}`, { headers: this.gethttpOptions() });
  }
}
