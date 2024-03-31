import { product } from './../../interfaces/products';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishListService } from 'src/app/services/wish-list.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  term:string = '';
  productList: product[] = []
  wishListIDs: any[] = []
  cartListIDs: any[] = []
  searchedItem: string = ''
  isLoading: boolean = false;
  addedToWishList: boolean = false
  

  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _WishListService: WishListService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true
    document.body.style.overflowX = 'hidden';
    this.getAllProducts();
    this.getLoggedUserCart()
    this.getLoggedUserWishList()
  }

  getAllProducts() {
    this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        this.isLoading = false
        this.productList = response.data
      },
      error: (err) => {
        this.isLoading = false
        console.log(err)
      }
    })
  }

  //////////////// CartList //////////////////
  getLoggedUserCart() {
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this._CartService.numOfCartItems.next(response.numOfCartItems)
        this.cartListIDs = response.data.products.map((productItem: any) => productItem.product._id)
      },
      error: err => console.log(err)
    })
  }

  addProductToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (response) => {
        this.getLoggedUserCart()
        this._CartService.showSuccess(response.message, response.status)
      },
      error: err => console.log(err)
    })
  }

  removeProductFromCart(productId: string) {
    this._CartService.removeProductById(productId).subscribe({
      next: (response) => {
        this.getLoggedUserCart()
        this._CartService.showError("Removed from cart", response.status)
      },
      error: err => console.log(err)
    })
  }

  //////////////// WishList //////////////////
  getLoggedUserWishList() {
    this._WishListService.getLoggedUserWishList().subscribe({
      next: (response) => {
        this._WishListService.numOfWishListItems.next(response.count)
        this.wishListIDs = response.data.map((product: any) => product._id)
      },
      error: err => console.log(err)
    })
  }

  addProductToWishList(productId: string) {
    this._WishListService.addProductToList(productId).subscribe({
      next: (response) => {
        this.getLoggedUserWishList()
        this._CartService.showSuccess(response.message, response.status)
      },
      error: err => console.log(err)
    })
  }

  removeProductFromWishList(productId: string) {
    this._WishListService.removeProductFromList(productId).subscribe({
      next: (response) => {
        this.getLoggedUserWishList()
        this._CartService.showError(response.message, response.status)
      },
      error: err => console.log(err)
    })
  }
}