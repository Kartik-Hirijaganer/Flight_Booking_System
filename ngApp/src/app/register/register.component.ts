import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BookFlightService } from '../bookService/book-flight.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData = {
    firstName:'',
    lastName:'',
    dateOfBirth:'',
    mobileNo:'',
    gender:'',
    emailId:'',
    password:''
  }

  isError = false;
  errorMsg = '';

  constructor(private _auth: AuthService, private _router: Router, private bookFlightService: BookFlightService) { }

  ngOnInit(): void {
  }

  registerUser(){
    // console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          var tokenObj = {
            token: res.token,
            userID: res.userId,
            userType: res.userType
          }
          this.bookFlightService.userId = res.userId;
          //store
          localStorage.setItem('token', JSON.stringify(tokenObj));
          this._router.navigate(['/mainHome']);
        },
        err => {
          console.log(err.error);
          this.isError = true;
          this.errorMsg = err.error.Error;
          this.ngOnInit();
        }
      )
  }
}
