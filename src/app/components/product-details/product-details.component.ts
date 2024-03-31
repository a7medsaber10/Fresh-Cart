import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  isLoading:boolean = true;
  wishListIDs: any[] = [];
  isUser: boolean = false;


  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 600,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 400,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }
  productItem:any;
  productId:string = '';
  constructor(
    private _ProductService: ProductService, 
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _ToastrService:ToastrService,
    private _WishListService:WishListService) {}

  ngOnInit(): void {

    if (localStorage.getItem('userToken')) {
      this.isUser = true;
      this.getLoggedUserWishList();
    }
    else {
      this.isUser = false;
    }
    this._ActivatedRoute.params.subscribe(params => {
      this.productId = params['id']
    })
    this._ProductService.getProductById(this.productId).subscribe({
      next: response => {
        this.productItem = response.data;
        this.isLoading = false;
        console.log(this.productItem);
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  addProductToCart (productId:string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (response:any) => {
        console.log(response);
        this._ToastrService.success(response.message, '', {
          positionClass: 'toast-bottom-left',
          progressBar: true,
          timeOut: 2500
        });
        this._CartService.numOfCartItems.next(response.numOfCartItems);
      },

      error: err => {
        console.log(err);
      }
    });
  }

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



