import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrdersService{
  baseUrl: string = "https://ecommerce.routemisr.com"
  userData: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private _HttpClient: HttpClient) { 
    this.decodeUserToken()
  }

  headers = {
    token: localStorage.getItem("userToken") || ''
  }

  checkOut(cartId: string|null, shippingAddressData: object): Observable<any> {
    // http://localhost:4200
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=https://a7medsaber10.github.io/Fresh-Cart `
      , { shippingAddress: shippingAddressData }
      , {headers : this.headers}
    )
  }

  decodeUserToken() {
    let userToken = JSON.stringify(localStorage.getItem("userToken"))
    let decoded = jwtDecode(userToken)
    this.userData.next(decoded)
  }

  getAllUserOrders(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/orders/user/${id}`)
  }
}
