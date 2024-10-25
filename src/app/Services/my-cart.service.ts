import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyCartService {


  User_Cart_Data:any=[];
  TotalAmount:any='';
  UseremailId:any;

  constructor() { }


  storeUserCartData(data:any){
    return  localStorage.setItem("userCartData",JSON.stringify(data))
  }

  getstoreUserCartData(){
    return  localStorage.getItem("userCartData");
  }

  clearstoreUserCartData(){
    return  localStorage.removeItem("userCartData");
  }

  getNumberOfItems(){
    let mydata:any=localStorage.getItem("userCartData");
    if (mydata) {
      return JSON.parse(mydata).length
   }
   }



}
