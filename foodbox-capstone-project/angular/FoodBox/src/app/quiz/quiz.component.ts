import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 


@Component({

  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions : any;
  currentQuestion : any;
  currentIndex: number = 0;
  
  marksOutOf : number = 0;
  marksObtained : number = 0;

  constructor(private _httpClient: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this._httpClient.get("http://localhost:3002/questions")
    .subscribe(
      (result) => {
        this.questions = result;
        console.log(this.questions[0].question);
      },
      (errors) => {console.log(errors)}
    )

  }

  getNextQuestion(){
    console.log("getNextQuestion" + this.questions.length);
    console.log(this.questions[this.currentIndex])
    if(this.currentIndex<this.questions.length){
      this.currentIndex++;
    }
    
  }

  getPreviousQuestion(){
    console.log("getPreviousQuestion");
    if(this.currentIndex > 0){
    this.currentIndex--;
    }
  }

  submit(){
    console.log("SUBMITTED");

    this.questions.forEach(element => {    
      this.marksOutOf = this.marksOutOf + element.weightage;
      console.log('element.correctAnswer.id =' + element.correctAnswer.id );
      console.log('element.selectedAnswer =' + element.selectedAnswer );
      
      if(element.correctAnswer.id == element.selectedAnswer){
        this.marksObtained = this.marksObtained + element.weightage;
      }
      this._router.navigate(['/result'], 
      { queryParams: 
        { marksOutOf: this.marksOutOf, marksObtained: this.marksObtained} }
      );

      console.log('Quiz.marksOutOf = ' + this.marksOutOf)
      console.log('Quiz.marksObtained = ' + this.marksObtained)

    });    
  }
}
