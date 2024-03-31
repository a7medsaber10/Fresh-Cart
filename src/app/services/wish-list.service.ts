import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  baseUrl: string = "https://ecommerce.routemisr.com";
  numOfWishListItems = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) {
    this.getLoggedUserWishList().subscribe({
      next: response => {
        console.log(response);
        this.numOfWishListItems.next(response.count);
      },
      error: err => {
        console.log(err);
      }
    });
  }
  headers = {
    token: localStorage.getItem("userToken") || ''
  }
  getLoggedUserWishList(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`,
    {headers : this.headers});
  }

  addProductToList(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`,
      { productId: productId },
      {headers : this.headers});
  }

  removeProductFromList(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${productId}`,
    {headers : this.headers})
  }
}
