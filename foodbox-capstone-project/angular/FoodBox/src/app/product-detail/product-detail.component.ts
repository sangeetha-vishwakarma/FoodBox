import { Cuisine } from './../models/Cuisine';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuisineService } from './../models/cuisine.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

 
  id: any;
  cuisine: Cuisine = new Cuisine();

  constructor(private _cuisineService: CuisineService, private _route: ActivatedRoute, private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params.id;
    this._cuisineService.getCuisineById(this.id).subscribe((result) => {
      this.cuisine = result;
      console.log(this.cuisine);
    }, (errors => console.log('There are some errors : ' + errors)))
    console.log(this.id);
  }
  
//    // create the form object.
//    form = new FormGroup({
//     fullName : new FormControl('' , Validators.required),
//     email : new FormControl('' , Validators.required),
//     password : new FormControl('' , Validators.required),
//     confirmPassword : new FormControl('' , Validators.required),
//     role : new FormControl('' , Validators.required),
// });

// AdminForm(AdminInformation)
// {

  public saveDetails(){
    this._cuisineService.saveProductDetails(this.cuisine).subscribe();
  }

}
