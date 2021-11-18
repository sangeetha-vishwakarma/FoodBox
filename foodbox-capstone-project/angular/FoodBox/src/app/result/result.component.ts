import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  marksOutOf: string;
  marksObtained: string;

  constructor(private _route: ActivatedRoute, private _router : Router) {}

  ngOnInit() {
    this._route.queryParamMap.subscribe(
        (queryParamMap) => { 
            console.log(queryParamMap);
            queryParamMap.get
            this.marksOutOf = queryParamMap.get('marksOutOf');
            this.marksObtained = queryParamMap.get('marksObtained');           
          }
      );
  
      console.log('this.marksOutOf = ' + this.marksOutOf)
      console.log('this.marksObtained = ' + this.marksObtained)
  }

}

