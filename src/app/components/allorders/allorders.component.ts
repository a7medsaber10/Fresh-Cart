import { OrdersService } from 'src/app/services/orders.service';
import { AllOrders } from './../../interfaces/all-orders';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit{
  orders: AllOrders[] = []
  userId: string = ''
  isLoading: boolean = false

  constructor(private _OrdersService:OrdersService){}
  
  ngOnInit(): void {
    document.body.style.overflowX = 'hidden';
    this.isLoading = true;
    this._OrdersService.decodeUserToken();
    this._OrdersService.userData.subscribe({
      next: () => this.userId = this._OrdersService.userData.getValue().id
    });
    this.getAllOrders();
  }

  getAllOrders() {
    this._OrdersService.getAllUserOrders(this.userId).subscribe({
      next: response => {
        document.body.style.overflowX = 'hidden';
        this.isLoading = false;
        this.orders = response;
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }
}
