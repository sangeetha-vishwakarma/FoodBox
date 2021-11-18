import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CuisineService } from './../models/cuisine.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  cuisineList: any;
  title:any;

  cache : any;
  cachedObservable : any;

  constructor(private _httpClient: HttpClient, private _cuisineService: CuisineService) {
    // this.title = this._cuisineService.title;
    // this.message = this._userService.getMessage();    
  }

  ngOnInit(): void {
    // this._httpClient.get("http://localhost:3002/cuisines").subscribe((result) => {
    //   this.cuisineList = result;
    //   console.log(this.cuisineList);
    // }, (errors) => { console.log(errors); })

    this._cuisineService.getAllCuisines().subscribe((result) => {
      this._cuisineService.cuisineList = result.json();
      this.cuisineList  = this._cuisineService.cuisineList;
      console.log(this.cuisineList);
    }, (errors => console.log('There are some errors : ' + errors)))

    // this.cuisineList = this._cuisineService.getAllCuisines();
  }

  public deleteProduct(id){
    console.log("In delete, id : "+ id);
    this._cuisineService.deletProductById(id).subscribe((result) => {
      this._cuisineService.cuisineList = result;
      this.cuisineList  = this._cuisineService.cuisineList;
      console.log(this.cuisineList);
    }, (errors => console.log('There are some errors : ' + errors)))
    this.cuisineList  = this._cuisineService.cuisineList;
    console.log(this.cuisineList);
  }

}
