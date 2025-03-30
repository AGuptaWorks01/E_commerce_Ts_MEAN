import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // using http for HTTP Methods
  private http = inject(HttpClient);
  // backend api
  private baseUrl = `${environment.baseUrl}/products`;

  // Generic HTTP method to handle any API call
  private makeRequest<T>(
    method: string,
    url: string,
    body?: any
  ): Observable<T> {
    switch (method) {
      case 'GET':
        return this.http.get<T>(url);
      case 'POST':
        return this.http.post<T>(url, body);
      case 'PUT':
        return this.http.put<T>(url, body);
      case 'DELETE':
        return this.http.delete<T>(url);
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }

  // get all product method
  getProducts(): Observable<any> {
    return this.makeRequest('GET', this.baseUrl);
  }

  // get by id each product
  getProductById(id: number): Observable<any> {
    return this.makeRequest('GET', `${this.baseUrl}/${id}`);
  }

  // for adding new product
  addProduct(product: any): Observable<any> {
    return this.makeRequest('POST', this.baseUrl, product);
  }

  // for updating existing product
  updateProduct(id: number, product: any): Observable<any> {
    return this.makeRequest('PUT', `${this.baseUrl}/${id}`, product);
  }
  
  // delete product mehtod
  deleteProduct(id: number): Observable<any> {
    return this.makeRequest('DELETE', `${this.baseUrl}/${id}`);
  }
}
