import { AllOrders } from 'src/app/interfaces/all-orders';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orders: AllOrders[] = []
  specificOrder: AllOrders[] = []
  userId: string = ''
  orderId: string = ''
  isLoading: boolean = false

  constructor(
    private _OrdersService: OrdersService,
    private _ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden'
    this.isLoading = true
    this.getUserId()
    this.getAllOrders()
    this.getOrderId()
  }

  getUserId() {
    this._OrdersService.userData.subscribe({
      next: () => this.userId = this._OrdersService.userData.getValue().id
    })
  }

  getAllOrders() {
    this._OrdersService.getAllUserOrders(this.userId).subscribe({
      next: (response) => {
        this.isLoading = false
        this.orders = response
        this.getSpecificOrder()
        document.body.style.overflow = 'auto'
      },
      error: (err) => {
        this.isLoading = false
        console.log(err)
      }
    })
  }

  getOrderId() {
    this._ActivatedRoute.params.subscribe(params => this.orderId = params['id'])
  }

  getSpecificOrder() {
    this.specificOrder = this.orders.filter((order) => order._id === this.orderId)
  }

}