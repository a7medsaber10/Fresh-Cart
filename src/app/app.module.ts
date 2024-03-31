import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CategorySliderComponent } from './components/category-slider/category-slider.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from './search.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { LandingComponent } from './components/landing/landing.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { ToastrModule } from 'ngx-toastr';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { BrandDescriptionComponent } from './components/brand-description/brand-description.component';
import { CategoryDescriptionComponent } from './components/category-description/category-description.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { AddHeadersInterceptor } from './add-headers.interceptor';
import { AllordersComponent } from './components/allorders/allorders.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent, 
    NotfoundComponent,
    HomeComponent,
    MainSliderComponent,
    BrandsComponent,
    ProductsComponent,
    CategoriesComponent,
    CartComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    CategorySliderComponent,
    SearchPipe,
    // LoaderComponent,
    LandingComponent,
    ScrollToTopComponent,
    ShippingAddressComponent,
    AllordersComponent,
    WishlistComponent,
    BrandDescriptionComponent,
    CategoryDescriptionComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    LoaderComponent //Stand alone component
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeadersInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
