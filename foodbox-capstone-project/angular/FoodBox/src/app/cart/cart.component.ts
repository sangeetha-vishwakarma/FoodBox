import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CuisineService } from './../models/cuisine.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  
  cuisineList: any;
  title:any;

  constructor(private router: Router, private _httpClient: HttpClient, private _cuisineService: CuisineService) {
    // this.title = this._cuisineService.title;
    // this.message = this._userService.getMessage();    
  }

  ngOnInit(): void {
    // this._httpClient.get("http://localhost:3002/cuisines").subscribe((result) => {
    //   this.cuisineList = result;
    //   console.log(this.cuisineList);
    // }, (errors) => { console.log(errors); })

    this.cuisineList = this._cuisineService.getSelectedItems();
    
  }

  public checkout() {
    this.router.navigateByUrl('/checkout');
  };

}
