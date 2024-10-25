import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyCartService } from 'src/app/Services/my-cart.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  btntext='Login';
  IsLogin:boolean=false;

  myForm=new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('',Validators.required),
  })


  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  constructor(private location: Location,private cartData:MyCartService){}


  ngOnInit(): void {
  }



  submitUserData(){ 
    console.log(this.myForm.value);

    if (this.myForm.valid) {
      this.cartData.UseremailId=this.myForm.get('email')?.value;;
      localStorage.setItem("userLoggedIn",'true');
      this.location.back();
    }
    else{
      alert("User deatils are Invalid")
    }
    return
  }
}
