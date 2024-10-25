import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn:any=false;

  constructor() { }

  isUserLogedIn(){
    this.isLoggedIn=localStorage.getItem('userLoggedIn')
  return JSON.parse(this.isLoggedIn);

  }

}
