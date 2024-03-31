import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numOfCartItems = new BehaviorSubject(0);

  constructor(private _HttpClient:HttpClient, private toastr: ToastrService) {
    if (localStorage.getItem('userToken')) {
      this.getLoggedUserCart().subscribe({
        next: response => this.numOfCartItems.next(response.numOfCartItems),
        error: err => console.log(err)
      })
    }
   }

   showSuccess(message: string, status: string) {
    this.toastr.success(message, status,
      {
        closeButton: true,
        timeOut: 2500,
        extendedTimeOut: 500,
        progressBar: true,
        tapToDismiss: false,
        positionClass: 'toast-bottom-left'
      });
  }

  showError(message: string, status: string) {
    this.toastr.error(message, status,
      {
        closeButton: true,
        timeOut: 2500,
        extendedTimeOut: 500,
        progressBar: true,
        tapToDismiss: false,
        positionClass: 'toast-bottom-left'
      });
  }

  headers = {
    token: localStorage.getItem("userToken") || ''
  }
  baseUrl:string = 'https://ecommerce.routemisr.com';
  addProductToCart(productId:string):Observable<any> 
  {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`,
    {productId:productId}, 
    {headers : this.headers});
  }
  getLoggedUserCart():Observable<any> 
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`, 
    {headers : this.headers});
  }
  removeProductById(productId:string):Observable<any> 
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${productId}`, 
    {headers : this.headers});
  }
  updateCartProductCount(productId:string, count:number):Observable<any> 
  {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${productId}`, 
    {count: count},
    {headers : this.headers});
  }
  clearCart():Observable<any> 
  {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`,
    {headers : this.headers});
  }

  
}
