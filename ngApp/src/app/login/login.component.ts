import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BookFlightService } from '../bookService/book-flight.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError = false;
  errorEmail = '';
  errorPass = '';


  loginUserData = {
    emailId:'',
    password:''
  }
  constructor(private _auth: AuthService, private _router: Router, private bookFlightService: BookFlightService) { }

  ngOnInit(): void {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res);
          var tokenObj = {
            token: res.token,
            userID: res.userId,
            userType: res.userType
          }
          
          //storing userId in bookingService
          this.bookFlightService.userId = res.userId;
          this.bookFlightService.userType = res.userType;
          //console.log(res.userType);
          //store
          localStorage.setItem('token', JSON.stringify(tokenObj));

          if(res.userType=="admin"){
            this._router.navigate(['/adminHome']);
          }
          else{
            this._router.navigate(['/mainHome']);
          }
        },
        err => {
          console.log(err);
          this.isLoginError = true;
          this.errorEmail = err.error.emailId;
          this.errorPass = err.error.password;
          console.log(err.error.password);

          this.ngOnInit();
        }
      )
  }
}
