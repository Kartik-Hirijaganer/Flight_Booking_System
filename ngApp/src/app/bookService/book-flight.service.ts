import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FlightData } from '../shared/flight-data.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class BookFlightService {
  userId = '';
  userType = '';
  bookingId:any;
  ticket:any=[];

  src:string = '';
  des:string = '';

  flight: FlightData[] = [];
  userDetails= {
    firstName: '',
    lastName: '',
    dateOfBirth: ''
  }
 
  readonly baseURL = 'http://localhost:3300/booking/add';
  readonly bookingsUrl = 'http://localhost:3300/booking/allbookings/';
  readonly cancelUrl = "http://localhost:3300/booking/cancel/";
  readonly allBookingsUrl = "http://localhost:3300/booking/all";

  constructor(private http: HttpClient, private _router: Router) { }

  bookedFlight(){
    return this.flight;
  }

  postBookingDetails(bookingObj: any) {
    //console.log(this.userId);
    var ticketId = this.http.post(this.baseURL + `/${bookingObj.flight.flightName}/${this.userId}`, bookingObj);
    return ticketId;
  }

  getBookedFlights(userId: any){
    return this.http.get(this.bookingsUrl+userId);
  }

  deleteBooking(bookingId: number){
    //console.log(this.cancelUrl+bookingId);
    return this.http.delete(this.cancelUrl+ bookingId);
  }

  getAllBookedFlights(){
    return this.http.get(this.allBookingsUrl);
  }

  checkIn(ticket:any){
    this.shortName(ticket.flight.source, ticket.flight.destination)
    this.ticket = ticket;
    console.log('inside checkin');
    this._router.navigate(['/checkIn']);
  }

  shortName(src:string, des:string){
    let s = src.toLowerCase();
    let d = des.toLowerCase()
    switch(s){
      case "mumbai":
        this.src = "BOM";
        break;
      case "delhi":
        this.src = "DEL";
        break;
      case "bangalore":
        this.src = "BLR";
        break;
      case "ahmedabad":
        this.src = "AMD";
        break;
    }

    switch(d){
      case "mumbai":
        this.des = "BOM";
        break;
      case "delhi":
        this.des = "DEL";
        break;
      case "bangalore":
        this.des = "BLR";
        break;
      case "ahmedabad":
        this.des = "AMD";
        break;
    }

  }
}
