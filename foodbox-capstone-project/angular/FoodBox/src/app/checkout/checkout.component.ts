import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuisine } from '../models/Cuisine';
import { CuisineService } from './../models/cuisine.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItemList : Cuisine[];
  totalPrice : number;

  constructor(private router: Router, private _cuisineService: CuisineService) { }

  ngOnInit(): void {
  this.cartItemList = this._cuisineService.getCart();
  this.totalPrice = 0;
  for(let cuisine of this.cartItemList){
      this.totalPrice = this.totalPrice +  (cuisine.price * cuisine.quantity);
  }
  }

  public confirmCheckout(){
    this.router.navigateByUrl('/success');
  }

}
