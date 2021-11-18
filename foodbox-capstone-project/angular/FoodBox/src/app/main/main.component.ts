import { Component, OnInit } from '@angular/core';
import { AdminService } from './../models/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  username : String = "";  
  isAdmin : boolean = false;
  isLoggedIn: boolean = false;

  constructor(private _adminService  : AdminService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {

    if((this._adminService.isLoggedIn()) ){
      this.isLoggedIn = true;
      this.username = localStorage.getItem("username");
      let role = localStorage.getItem("role");
      if(role == 'admin'){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
    }else{
      this.isLoggedIn = false;
      this.isAdmin = false;
    }
  
    // if((this.adminService.isLoggedIn()) )
    // {
    //     this.router.navigate(['/home']);
    // }
    // else
    // {
    //     this.router.navigate(['/login']);
    // }
    
  }

}
