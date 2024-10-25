import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { MyCartService } from 'src/app/Services/my-cart.service';
import { ProductDetailDataService } from 'src/app/Services/product-detail-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  
  DataSource: any = [];
  categorySelect:any = '';  
  titleSearch:string = '';
  priceRangeSerach:string='';
  sort: string = '';
  search:string='';
  DataHold:any=[];


  priceRanges :any = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under ₹10', min: 0, max: 10 },
    { label: '₹10 - ₹50', min: 10, max: 50 },
    { label: '₹50 - ₹100', min: 50, max: 100 },
    { label: '₹100 - ₹200', min: 100, max: 200 },
    { label: 'Over ₹200', min: 200, max: Infinity },
  ];


  CategoryArray :any =[
    {label:"All Categories",value:''},
    {label:"Men's Clothing",value:"men's clothing"},
    {label:"Women's Clothing",value:"women's clothing"},
    {label:"Jewelry",value:"jewelery"},
    {label:"Electronics",value:"electronics"},
  ]

  constructor(
    public productService: ApiService,
    private productDataShare: ProductDetailDataService,
    private router: Router,
    private cartData: MyCartService
  ) {
    productDataShare.clearProductData();
    cartData.getNumberOfItems();
  }

  ngOnInit() {
      this.getProductList();     
   }

   PaginationArray:any=[];


   getProductList() {
    this.productService.getProductList().subscribe(
      (data:any) => {
        // Fetched data from get method
        // there is no status or msg given so didn't used any condition res.status == 200.
        this.DataHold=data;
        this.DataSource=data;
        this.loadInitialData();
        this.checkPresenceOfItem();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkPresenceOfItem(){
    let abc = this.cartData.getstoreUserCartData();
    if (abc) {
      this.cartData.User_Cart_Data = JSON.parse(abc);
      console.log("this.cartData.User_Cart_Data",this.cartData.User_Cart_Data);
      for (let i = 0; i < this.cartData.User_Cart_Data.length; i++) {
      const element = this.cartData.User_Cart_Data[i];
      const itemExists = this.DataHold.some((item: { id: any; }) => item.id ===element.id);
        if (itemExists) {
          const itemToUpdate = this.DataHold.find((item: { id: any; }) => item.id === element.id);
          if (itemToUpdate) {
            itemToUpdate.alreadyAdded = true;
          }
        }
     
      }
    }
  }


  loadInitialData(){
    this.PaginationArray=this.DataSource.slice(0,8)
  }

  selectProduct(data: any) {
    data['quantity'] = 1;
    this.productDataShare.storeProduct(data);
    this.router.navigate(['/product-details']);
  }

  ViewMore(){
    if(this.PaginationArray.length<this.DataSource.length){
      let moredata = this.DataSource.slice(this.PaginationArray.length,this.PaginationArray.length+5);
      this.PaginationArray = [...this.PaginationArray, ...moredata];
    }    
  }


  filter() {
    this.resetFilters(3);
     let data = [...this.DataHold].sort((a, b) => a.price - b.price);
     if(this.sort == 'htl'){
      data = data.reverse();
    }
    this.DataSource = data;
    this.loadInitialData();
  }



  filterByCategory(category: string) {
    this.resetFilters(2);
    if (category) {
      this.DataSource = this.DataHold.filter((product: { category: string; }) => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    } else {
      this.DataSource = this.DataHold; 
    }
    this.loadInitialData();
  }

  filterByTitle(title: string) {
    this.resetFilters(1);
    if (title) {
      this.DataSource = this.DataHold.filter((product: { title: string; }) => 
        product.title.toLowerCase().includes(title.toLowerCase())
      );
    } else {
      this.DataSource = this.DataHold;
    }
    this.loadInitialData();

  }

  filterByPrice(data: any) {
    this.resetFilters(4);
    if (data) {
      this.DataSource = this.DataHold.filter((item: any) => item.price >= data.min && item.price < data.max);
    } else {
      this.DataSource = this.DataHold;
    }
    this.loadInitialData();    
  }


  resetFilters(num:any){
    switch (num) {
      case 1:
        this.categorySelect = '';  
        this.sort='';
        this.priceRangeSerach='';
        break;
      case 2:
        this.titleSearch='';
        this.sort='';
        this.priceRangeSerach='';
        break;
      case 3:
        this.titleSearch='';
        this.categorySelect = '';  
        this.priceRangeSerach='';
        break;
      case 4:
        this.titleSearch='';
        this.categorySelect = '';  
        this.sort='';
          break;                            
      default:
        this.titleSearch='';
        this.categorySelect = '';  
        this.sort='';
        this.priceRangeSerach='';
        break;
    }
  }


}
