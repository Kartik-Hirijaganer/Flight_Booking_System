import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookFlightService } from '../bookService/book-flight.service';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent implements OnInit {

  constructor(private _router: Router, public bookFlightService: BookFlightService) { }

  ngOnInit(): void {
  }

  viewBookings(){
    //viewBookings()
    this._router.navigate(['/viewallbookings', this.bookFlightService.userId, this.bookFlightService.userType]);
  }
}
