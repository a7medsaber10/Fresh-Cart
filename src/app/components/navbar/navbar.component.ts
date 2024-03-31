import { CartService } from 'src/app/services/cart.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  numOfCartItems:number = 0;
  numOfWishListItems:number = 0;
  isLogin:boolean = false;
  @ViewChild('navbarToggler') navbarToggler!: ElementRef;
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;
  
  constructor(
    public _AuthService:AuthService,
    private _CartService:CartService,
    private _WishListService:WishListService
  ) {}

  ngOnInit(): void {

    this._CartService.numOfCartItems.subscribe(() => {
      this.numOfCartItems = this._CartService.numOfCartItems.getValue();
    });

    this._WishListService.numOfWishListItems.subscribe(() => {
      this.numOfWishListItems = this._WishListService.numOfWishListItems.getValue();
    });

    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue() != null) {this.isLogin = true;}
        else {this.isLogin = false;}
      }
    });
  }

  closeNav() {
    this.navbarToggler.nativeElement.classList.toggle("collapsed");
    this.navbarCollapse.nativeElement.classList.toggle("show");
  }
}
