import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit{
  cartId: string | null = '';
  isLoadingLayer: boolean = false;
  isLoading: boolean = false;
  apiError: string = ''
  URL: string = ''

  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
  });

  constructor(
    public _OrdersService: OrdersService,
    private _ActivatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.isLoadingLayerMethod()
    this._ActivatedRoute.paramMap.subscribe(params => this.cartId = params.get('cartId'))
    console.log(this.cartId);
  }

  isLoadingLayerMethod() {
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      document.body.style.overflow = 'auto'
      this.isLoadingLayer = true
    }, 1000)
  }

  submitShippingAddress() {
    this.isLoading = true;
    this._OrdersService.checkOut(this.cartId, this.shippingAddress.value).subscribe({
      next: (response) => {
        this.isLoading = false
        if (response.status == "success" && this.shippingAddress.status == "VALID") {
          window.open(response.session.url, "_self");
        }
      },
      error: (err) => {
        console.log(err);
        this.apiError = err.error.message
        this.isLoading = false
      }
    })
  }


}
