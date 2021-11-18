import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CuisineService } from './../models/cuisine.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  cuisineList: any;
  title:any;

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
  
//   if((this.adminService.isLoggedIn()) )
//   {
//     this.route.paramMap.subscribe(params => {
//       this.adminId =+ params.get('adminId');
//     });
//   }
//   else
//   {
//       this.router.navigate(['/login']);
//   }

// }


// getAdminData()
// {
//     this.haveData = 0;

//     this.dataRequest = true;

//     this.adminService.getAdminDetail(this.adminId).subscribe(
//         response => {

//             let result = response.json();
//             this.data = result;

//             if(result == " ")
//             {
//                 this.haveData = 0;
//             }
//             else
//             {
//               this.haveData = this.haveData + 1;
//             }
//         },
//         error => {
//             console.log("error while getting Admin Data");
//         }
//     );
// }

  

}
