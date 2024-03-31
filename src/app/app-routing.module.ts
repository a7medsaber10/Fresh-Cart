import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './guard/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { BrandDescriptionComponent } from './components/brand-description/brand-description.component';
import { CategoryDescriptionComponent } from './components/category-description/category-description.component';

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "home", canActivate: [authGuard], component: HomeComponent, title: "Home"},
  {path: "settings", loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)},
  {path: "brand-description/:id", canActivate: [authGuard], component: BrandDescriptionComponent, title: "Brand Description"},
  {path: "category-description/:id", canActivate: [authGuard], component: CategoryDescriptionComponent, title: "Category Description"},
  {path: "order-details/:id", canActivate: [authGuard], component: OrderDetailsComponent, title: "Order Details"},
  {path: "shippingAdderss/:cartId", canActivate: [authGuard], component: ShippingAddressComponent, title: "shipping Address"},
  {path: "wishlist", canActivate: [authGuard], component: WishlistComponent, title: "Wish List"},
  {path: "allorders", canActivate: [authGuard], component: AllordersComponent, title: "All Orders"},
  {path: "products", canActivate: [authGuard],component: ProductsComponent, title: "Products"},
  {path: "categories",canActivate: [authGuard], component: CategoriesComponent, title: "Categories"},
  {path: "brands",canActivate: [authGuard], component: BrandsComponent, title: "Brands"},
  {path: "cart",canActivate: [authGuard], component: CartComponent, title: "Cart"},
  {path: "productdetails/:id",canActivate: [authGuard], component: ProductDetailsComponent, title: "product details"},
  {path: "register", component: RegisterComponent, title: "Register"},
  {path: "login", component: LoginComponent, title: "Login"},
  {path: "**", component: NotfoundComponent, title: "Not Found"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
