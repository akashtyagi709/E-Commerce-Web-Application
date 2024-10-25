import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailDataService {


  constructor() { }


  storeProduct(data:any){
    return  localStorage.setItem("product",JSON.stringify(data))
  }

  getProduct(){
    return  localStorage.getItem("product");
  }

  clearProductData(){
    return  localStorage.removeItem("product");
  }
}
