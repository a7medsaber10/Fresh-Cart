import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl:string = 'https://ecommerce.routemisr.com'
  constructor(private _HttpClient:HttpClient) { }

  getAllProducts():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products`)
  }

  getAllCategories():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`)
  }
  getAllBrands():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands`)
  }

  getCategoryById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories/${id}`)
  }

  getBrandById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands/${id}`)
  }

  getProductById(id:string):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${id}`)
  }
}

