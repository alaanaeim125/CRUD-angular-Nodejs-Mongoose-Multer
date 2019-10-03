import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http: HttpClient) { }

  addNewProductt(product: Product): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain'
      })
    };

    return (this.http.post<any>(`http://localhost:3030/addNewProdut`, product, httpOptions));
  }

  getAllProducts(): Observable<Product[]> {
    return (this.http.get<Product[]>(`http://localhost:3030/getAllProducts`));
  }

  getOneProduct(id): Observable<Product> {
    return (this.http.get<Product>(`http://localhost:3030/getOneProduct/${id}`));
  }


  deleteOneProduct(id): Observable<any> {
    return (this.http.delete<any>(`http://localhost:3030/deleteOneProduct/${id}`));
  }


  updateProduct(id, product): Observable<any> {
    return (this.http.put<any>(`http://localhost:3030/updateOneProduct/${id}`, product));
  }




}
