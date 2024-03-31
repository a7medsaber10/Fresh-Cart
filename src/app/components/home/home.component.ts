import { product } from './../../interfaces/products';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishListService } from 'src/app/services/wish-list.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  term:string = '';
  isLoading:boolean = true;
  productList:product[] = [];
  pageNumber: number = 0;
  limit: number = 0;
  wishListIDs: any[] = []
  cartListIDs: any[] = []
  isUser: boolean = false;
  productItem:any;
  productId:string = '';

  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _WishListService: WishListService,
    ) {}

  ngOnInit(): void {
    this.isLoading = true
    document.body.style.overflowX = 'hidden';
    this.getAllProducts();
    if (localStorage.getItem('userToken')) {
      this.isUser = true;
      this.getLoggedUserWishList();
      this.getLoggedUserCart();
    }
    else
      this.isUser = false;
  }

  productImage:any;
  getAllProducts() {
    this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response.data[0]);
        this.isLoading = false;
        this.productList = response.data;
        this.pageNumber = response.currentPage;
        this.limit = response.limit;
      },
      error: err => {
        this.isLoading = false;
        console.log(err);
      }
    })
  }

  @ViewChild('product') productCard!: ElementRef
  changePageNumber(e: any) {
    this.pageNumber = e;
    window.scrollTo({
      top: this.productCard.nativeElement.offsetTop - 200,
      behavior: 'smooth'
    });
  }

  // Cart
  getLoggedUserCart() {
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this._CartService.numOfCartItems.next(response.numOfCartItems);
        this.cartListIDs = response.data.products.map((productItem: any) => productItem.product._id);
      },
      error: err => console.log(err)
    })
  }

  addProductToCart (productId:string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (response:any) => {
        console.log(response);
        this.getLoggedUserCart();
        this._CartService.showSuccess(response.message, response.status)
      },

      error: err => {
        console.log(err);
      }
    });
  }

  removeProductFromCart(productId: string) {
    this._CartService.removeProductById(productId).subscribe({
      next: (response) => {
        this.getLoggedUserCart();
        this._CartService.showError("Removed from cart", response.status);
      },
      error: err => console.log(err)
    })
  }

  // WishList
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
