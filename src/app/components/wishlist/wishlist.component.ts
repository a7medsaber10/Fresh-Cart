import { Component, OnInit } from '@angular/core';
import { wishlistData } from 'src/app/interfaces/wishlist';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishList: wishlistData[] = []
  wishListIDs: string[] = []
  cartIDs: string[] = []
  isLoading: boolean = false;
  numOfWishListItems: number = 0;

  constructor(
    private _WishListService: WishListService,
    private _CartService: CartService,
  ) { }

  ngOnInit(): void {
    document.body.style.overflowX = 'hidden'
    this.isLoading = true
    this.getLoggedUserWishList()
    this.getLoggedUserCart()
  }

  //////////////// CartList //////////////////
  getLoggedUserCart() {
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this._CartService.numOfCartItems.next(response.numOfCartItems)
        this.cartIDs = response.data.products.map((productItem: any) => productItem.product._id)
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
        document.body.style.overflowX = 'hidden';
        this.isLoading = false;
        this.wishList = response.data;
        this.wishListIDs = this.wishList.map((product: any) => product._id);
        this._WishListService.numOfWishListItems.next(response.count);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    })
  }

  removeProductFromWishList(productId: string) {
    this._WishListService.removeProductFromList(productId).subscribe({
      next: (response) => {
        this.isLoading = false
        this.getLoggedUserWishList()
        this._CartService.showError(response.message, response.status)
      },
      error: (err) => {
        this.isLoading = false
        console.log(err);
      }
    })
  }
}