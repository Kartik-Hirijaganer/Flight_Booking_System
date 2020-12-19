import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookFlightService } from '../bookService/book-flight.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {

  bookedFlights:any = [];
  isDisable = true;

  constructor(
    public bookFlightService: BookFlightService,
     private route: ActivatedRoute
     ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    const userType = this.route.snapshot.paramMap.get('userType');

    if(userType=='admin'){
      console.log("admin");
      this.isDisable = false;
      this.viewAllBookings();
    }
    else{
      this.viewBookedFlights(userId);
    }
    // this.viewBookedFlights(userId);
  }

  viewBookedFlights(userId: any){
    this.bookFlightService.getBookedFlights(userId)
      .subscribe(
        res => {
          //console.log(res);
          this.bookedFlights = res;
          // console.log(this.bookedFlights[0].flight);
        },
        err => {
          console.log(err);
        }
      )
  }

  cancelBooking(bookingId: number){
    // console.log(typeof(bookingId));
    if(confirm(`Are you sure you want to cancel your booking
20% amount will be deducted ?`) == true){
      this.bookFlightService.deleteBooking(bookingId)
      .subscribe(
        res => {
          this.viewBookedFlights(this.route.snapshot.paramMap.get('userId'));
          console.log('booking cancelled');
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  viewAllBookings(){
      this.bookFlightService.getAllBookedFlights()
        .subscribe(
          res => {
            console.log(res);
            this.bookedFlights = res;
          },
          err => {
            console.log(err);
          }
        )
  }

}
