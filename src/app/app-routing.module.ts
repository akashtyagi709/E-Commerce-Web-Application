
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductDetailPageComponent } from './Components/product-detail-page/product-detail-page.component';
import { CartComponent } from './Components/cart/cart.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { AuthGuardGuard } from './Guards/auth-guard.guard';
import { CheckoutComponent } from './Components/checkout/checkout.component';

const appRoutes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product-details', component: ProductDetailPageComponent },
  { path: 'add-to-cart', component: CartComponent },
  { path: 'signUp-login', component: LoginPageComponent },
  { path: 'checkout', component: CheckoutComponent,canActivate: [AuthGuardGuard] },

    
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}