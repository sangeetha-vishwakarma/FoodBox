import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Cuisine } from './cuisine';
import { Http, RequestOptions , Headers } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class CuisineService {

    baseUrl : String = '';
    cuisineList : Cuisine[];
    cart : Cuisine[] = [];

    // constructor(private _httpClient: HttpClient) { 
    // //     this._httpClient.get<Cuisine[]>("http://localhost:3002/cuisines").subscribe((result) => {
    // //   this.cuisineList = result;
    // //   console.log(this.cuisineList);
    // // }, (errors) => { console.log(errors); })
    //     // this._httpClient.get("http://localhost:3002/cuisines");
    // }

    constructor(private _httpClient: HttpClient, private http: Http, private router : Router) { }

    title: string = "Cuisine Management System";

    getMessage(): string {
        return "Cuisine List";
    }

    getAllCuisines(): Observable<any> {

        // return this._httpClient.get<Cuisine[]>("http://localhost:3002/cuisines");
        let url = "http://localhost:9090/product";//this.baseUrl + "getAdminData/" + adminId;

        // create an instance of Header object.
       let headers = new Headers();
 
       // get token from localStorage.
       let token = localStorage.getItem('token');

    //    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJleHAiOjE2MjE5NzQ1NjEsImlhdCI6MTYyMTk1NjU2MX0.FXRVeXEjJF7ReeGYcKlQvP_U_8hCwyviL_VryIQdWGRHVJi1-o3_cPSILqMV-f2xQ2ZiFr2UsPJqUrSQO75e8g";//localStorage.getItem('token');
 
       // Append Authorization header.
       headers.append('Authorization' , 'Bearer ' + token);
 
       // create object of RequestOptions[ and include that in it.
       let options = new RequestOptions( { headers : headers } );
 
       return this.http.get(url , options);



    }

    // getAllCuisines(): Observable<any> {

    //     // return this._httpClient.get<Cuisine[]>("http://localhost:3002/cuisines");
    //     let url = "http://localhost:9090/product";//this.baseUrl + "getAdminData/" + adminId;

    //    // create an instance of Header object.
    // //   let headers = new Headers();

    //   // get token from localStorage.
    //   let token = localStorage.getItem('token');

    //   // Append Authorization header.
    // //   headers.append('Authorization' , 'Bearer ' + token);
    // let headers = new HttpHeaders();
    // //   headers.append('Authorization' , 'Bearer ' + " eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJleHAiOjE2MjE3MjM5NTUsImlhdCI6MTYyMTcwNTk1NX0.L6tE-7B7xzSmwWExO5knWpJDbyBQ9hdC7quAHhZy2_NT0qCviFJqc9LhSwfNyrdRfm7WtJy7zzitt9qOsJb-Og");
    // headers.set('Authorization' , 'Bearer ' + " eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJleHAiOjE2MjE3MjM5NTUsImlhdCI6MTYyMTcwNTk1NX0.L6tE-7B7xzSmwWExO5knWpJDbyBQ9hdC7quAHhZy2_NT0qCviFJqc9LhSwfNyrdRfm7WtJy7zzitt9qOsJb-Og");

    //   // create object of RequestOptions and include that in it.
    // //   let options = new RequestOptions( { headers : headers } );

    // //  return this.http.get(url , options);
    //  //return this._httpClient.get<Cuisine[]>("http://localhost:9090/products");

    //  return this._httpClient.get<Cuisine[]>("http://localhost:9090/product", 
    //  {headers : headers });

    // //  new HttpHeaders().set('Authorization', 'my-auth-token'),



    // }
   

    getCuisineById(id: number) : Observable<Cuisine> {
        return this._httpClient.get<Cuisine>("http://localhost:9090/product/" + id);
    }

    getCuisineList(){
        return this.cuisineList;
    }

    saveProductDetails(cuisine : Cuisine) : Observable<any>
    {
        
        // return this._httpClient.get<Cuisine[]>("http://localhost:3002/cuisines");
        let url = "http://localhost:9090/product";//this.baseUrl + "getAdminData/" + adminId;

        // create an instance of Header object.
       let headers = new Headers();
 
       // get token from localStorage.
       let token = localStorage.getItem('token');

    //    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJleHAiOjE2MjE5NzQ1NjEsImlhdCI6MTYyMTk1NjU2MX0.FXRVeXEjJF7ReeGYcKlQvP_U_8hCwyviL_VryIQdWGRHVJi1-o3_cPSILqMV-f2xQ2ZiFr2UsPJqUrSQO75e8g";//localStorage.getItem('token');
 
       // Append Authorization header.
       headers.append('Authorization' , 'Bearer ' + token);
 
       // create object of RequestOptions and include that in it.
       let options = new RequestOptions( { headers : headers } );
 
       return this.http.post(url , cuisine, options);


        // //let url = this.baseUrl + "saveAdmin";
        // return this.http.post("http://localhost:9090/product", cuisine);
    }

    deletProductById(id : number) : Observable<any>
    {
        //let url = this.baseUrl + "saveAdmin";
        return this._httpClient.delete("http://localhost:9090/product/" + id);
        //sssreturn this.getAllCuisines();
    }

    
    getSelectedItems(){
        
        for(let cuisine of this.cuisineList){
            if(cuisine.quantity>0){
                if(!this.cart.includes(cuisine)){
                    this.cart.push(cuisine);
                }
            }
        }
        
        return this.cart;
    }

    getCart(){
        return this.cart;
    }
}