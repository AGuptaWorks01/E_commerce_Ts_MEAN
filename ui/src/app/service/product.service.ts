import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // using http for HTTP Methods
  private http = inject(HttpClient)

  // backend api 
  private baseUrl = `${environment.baseUrl}/products`

  // get all product method
  getProducts(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // get by id each product
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // for adding new product
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, product);
  }


  // for updating existing product
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, product);
  }

  // delete product mehtod
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

}
