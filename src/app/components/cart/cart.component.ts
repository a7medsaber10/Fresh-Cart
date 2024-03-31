import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartId:string = "";
  errorMessage:string = '';
  isLoading:boolean = true;
  numOfCartItems:number = 0; 
  totalPrice:number = 0; 
  productList:any[] = []; 
  constructor(private _CartService:CartService ) {}

  ngOnInit(): void {
    this.getLoggedUserData();
  }

  getLoggedUserData() {
    this._CartService.getLoggedUserCart().subscribe({
      next: response => {
        this.cartId = response.data._id;
        this.numOfCartItems = response.numOfCartItems;
        this.totalPrice = response.data.totalCartPrice;
        this.productList = response.data.products;
        console.log(response);
        console.log(this.productList);
        this.isLoading = false;
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
        err.error.message = "Your Cart is Empty";
        this.errorMessage = err.error.message;
        
      }
    });
  }

  removeProductFromCart(productId:string) {
    this._CartService.removeProductById(productId).subscribe({
      next : response => {
        console.log(response);
        this.numOfCartItems = response.numOfCartItems;
        this.totalPrice = response.data.totalCartPrice;
        this.productList = response.data.products;
        this._CartService.numOfCartItems.next(response.numOfCartItems);
      },
      error: err => {
        console.log(err);
      }
    });
  }
  updateCartProductQuantity(productId:string, count:number, e:any) {
    if (e.target.classList.contains('fa-plus') || e.target.classList.contains('fa-minus'))
      e.target.classList.add('fa-spinner', 'fa-spin')
    else
      e.target.innerHTML = '<i class="fa fa-spinner fa-spin"></i>'
    
    this._CartService.updateCartProductCount(productId, count).subscribe({
      next : response => {
        console.log(response);
        this.numOfCartItems = response.numOfCartItems;
        this.totalPrice = response.data.totalCartPrice;
        this.productList = response.data.products;
        this.isLoading = false;
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }
  clearCart() {
    // this.isLoading = true;
    this._CartService.clearCart().subscribe({
      next : response => {
        console.log(response);
        this.numOfCartItems = 0;
        this.totalPrice = 0;
        this.productList = [];
        this.isLoading = false;
        this.errorMessage = "Your Cart is empty!";
        this._CartService.numOfCartItems.next(response.numOfCartItems);
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }
}
