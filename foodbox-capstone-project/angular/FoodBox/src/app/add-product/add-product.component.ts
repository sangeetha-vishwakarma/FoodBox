import { Component, OnInit } from '@angular/core';
import { Cuisine } from './../models/Cuisine';
import { CuisineService } from './../models/cuisine.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  cuisine: Cuisine;

  constructor(private _cuisineService: CuisineService) { }

  ngOnInit(): void {
    this.cuisine = new Cuisine();
  }

  public addDetails(){
    this._cuisineService.saveProductDetails(this.cuisine).subscribe();
  }

}
