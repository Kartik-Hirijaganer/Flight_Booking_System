import { Component, OnInit, NgZone} from '@angular/core';
import { AuthService } from '../auth.service';

import { WindowRefService } from '../window-ref.service';
import { BookFlightService } from '../bookService/book-flight.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  
  public rzp: any;
  public today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.today.getFullYear();

  public date = this.mm + '/' + this.dd + '/' + this.yyyy;

  userDetails= {
    firstName: '',
    lastName: '',
    email: ''
  }
  constructor(
    public bookFlightService: BookFlightService,
     public _authService: AuthService,
     private winRef: WindowRefService,
     private zone: NgZone,
     private _router: Router,
     public dialog: MatDialog
     ) { }

  ngOnInit(): void {
  }

  //booking method
  onBook(){
    //console.log('inside on book');
    var user = this.userDetails;
    var flight = this.bookFlightService.flight[0];
   
    let bookingObj= {
      flight,
      user
    }

    this.bookFlightService.postBookingDetails(bookingObj)
      .subscribe(
        res => {
          //console.log(res);
          this.bookFlightService.bookingId = res;
          //dialog box;
          this.dialog.open(DialogLoginComponent);
        },
        err => {
          console.log(err);
        }
      ) 
  }

  //payment method
  payWithRazor(){ 
    let options:any = {
        "key": "rzp_test_UKOSZWVmPKBrfK",
        "amount": this.bookFlightService.flight[0].fare*100,
        "name": "Flight Booking",
        "description": "Flight booking payment",
        "modal": {
          escape: false,
        }, 
        "theme": {
          "color": "#00688B"
        }
      };
      options.handler = ((response:any) => {
          console.log(response);
          this.zone.run(() => {
            // add API call here
            this.onBook();
          });
      });
      options.modal.ondismiss = ((response:any) => {
          console.log(response);
      });
      let rzp = new this.winRef.nativeWindow.Razorpay(options);
      rzp.open();
  } 

  test(){
    this.dialog.open(DialogLoginComponent);
  };
}


