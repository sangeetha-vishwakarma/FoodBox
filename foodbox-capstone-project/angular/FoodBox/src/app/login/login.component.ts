import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminDetail } from '../models/admin-detail';
import { AdminService } from '../models/admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private adminDetail = new AdminDetail();

  constructor(private _adminService : AdminService, private router : Router) { }

  ngOnInit() {
    if((this._adminService.isLoggedIn()) )
    {
        this.router.navigate(['/home']);
    }
    else
    {
        this.router.navigate(['/login']);
    }
  }

  // create the form object.
  form = new FormGroup({
    email : new FormControl('' , Validators.required),
    password : new FormControl('' , Validators.required)
  });

  Login(LoginInformation)
  {
      this.adminDetail.username = this.Email.value;
      this.adminDetail.password = this.Password.value;

      this._adminService.login(this.adminDetail).subscribe(
        response => {
            let result =  response.json();
            
            if(result != null)
            {
              let token = result.token; //response.headers.get("Authorization");

              localStorage.setItem("token" , token);

              this._adminService.setAdminDetails(result.user);  
              localStorage.setItem("role" , this._adminService.adminDetails.role);
              localStorage.setItem("username" , this._adminService.adminDetails.name);

              // this.router.navigate(['/home', result]);
              window.location.replace('/home');
            }
            else
            {
              alert("please register before login Or Invalid combination of Email and password");
            }
           
        },
        error => {
            console.log("Error in authentication");
        }
      );
  }

  get Email(){
      return this.form.get('email');
  }

  get Password(){
      return this.form.get('password');
  }

}
