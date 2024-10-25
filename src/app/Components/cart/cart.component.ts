import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyCartService } from 'src/app/Services/my-cart.service';
import { ProductDetailDataService } from 'src/app/Services/product-detail-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  // UserCartData:any=[];
  Subtotal: any = 0;
  TotalAmount: any = 0;
  shiping_and_billing: any = 0;
  shiping_discount: any = 0;

  constructor(
    private productDataShare: ProductDetailDataService,
    private router: Router,
    public cartData: MyCartService
  ) {
    let data: any = cartData.getstoreUserCartData();
    this.cartData.User_Cart_Data = JSON.parse(data);
    if (this.cartData.User_Cart_Data == null) {
      this.cartData.User_Cart_Data = [];
    }
    if (this.cartData.User_Cart_Data) {
      this.calculateAmount();
    }
  }

  calculateAmount() {
    var sumArray: any = [];
    for (let index = 0; index < this.cartData.User_Cart_Data.length; index++) {
      const element = this.cartData.User_Cart_Data[index];
      sumArray.push(element.totalAmount);
    }
    if (this.cartData.User_Cart_Data.length) {
      let sum = sumArray.reduce((a1: any, a2: any) => a1 + a2, 0);
      this.Subtotal = sum.toFixed(2);
      this.TotalAmount = sum + 20;
      this.TotalAmount = this.TotalAmount.toFixed(2);
      this.cartData.TotalAmount = this.TotalAmount;
      this.shiping_discount = 5.00;
      this.shiping_and_billing = 25.00;
      console.log("this.TotalAmount",this.TotalAmount);
      
    } else {
      this.cartData.TotalAmount = this.TotalAmount = this.Subtotal= this.shiping_and_billing= this.shiping_discount=0;
    }
  }

  removeItem(data: any, i: any) {
    for (let i = 0; i < this.cartData.User_Cart_Data.length; i++) {
      const element = this.cartData.User_Cart_Data[i];
      if (data.id == element.id) {
        this.cartData.User_Cart_Data.splice(i, 1);
        this.cartData.storeUserCartData(this.cartData.User_Cart_Data);
        this.calculateAmount();
        return;
      }
    }
    this.TotalAmount = this.TotalAmount.toFixed(2);
    this.cartData.TotalAmount = this.TotalAmount = this.cartData.User_Cart_Data.length == 0 ? 0 : this.TotalAmount;
  }

  checkout() {
    console.log(localStorage.getItem('userLoggedIn'));
    this.router.navigate(['/checkout']);
  }

  quanitiyFunction(section:any,data:any){
    for (let i = 0; i < this.cartData.User_Cart_Data.length; i++) {
      const element = this.cartData.User_Cart_Data[i];
      if (element.id==data.id) {        
        if (section == 'add') {
          element.quantity++;
          element.totalAmount=element.price*element.quantity;
        }
        else {
          if (data.quantity > 1) {
            element.quantity--;
            element.totalAmount=element.price*element.quantity;
        }
      }
    }
    
  }
  console.log("Updated ",this.cartData.User_Cart_Data);  
  this.cartData.storeUserCartData(this.cartData.User_Cart_Data);  
  this.calculateAmount();
  }
}
