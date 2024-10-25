import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MyCartService } from 'src/app/Services/my-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public cartData:MyCartService, public authservice:AuthService){
  }


  ngOnInit(): void {

  }

}
