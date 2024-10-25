import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 


import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Comman Component/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductDetailPageComponent } from './Components/product-detail-page/product-detail-page.component';
import { CartComponent } from './Components/cart/cart.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { RequestModifierInterceptor } from './Interceptor/request-modifier.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProductDetailPageComponent,
    CartComponent,
    LoginPageComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,RouterModule, AppRoutingModule,HttpClientModule,FormsModule, ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestModifierInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
