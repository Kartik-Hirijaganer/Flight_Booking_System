import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { FlightData } from './flight-data.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  selectedFlight: FlightData = new FlightData;
  flights: FlightData[] = [];
  readonly baseURL = 'http://localhost:3100/admin';

  constructor(private http: HttpClient) { }

  postFlight(flight: FlightData) {
    return this.http.post(`${this.baseURL}/add/flight`, flight);
  }

  getFlightList() {
    return this.http.get(`${this.baseURL}/flights`);
  }

  putFlight(f: FlightData) {
    return this.http.put(this.baseURL + `/edit/flight/${f._id}`, f);
  }

  deleteFlight(flightName: string) {
    return this.http.delete(this.baseURL + `/delete/flight/${flightName}`);
  }
}
