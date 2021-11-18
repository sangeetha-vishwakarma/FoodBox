import { Component, OnInit } from '@angular/core';
import { AdminService } from '../models/admin.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _adminService :AdminService) { }

  ngOnInit(): void {
    this._adminService.logout();
    window.location.replace('/home');
  }

}
