import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { FlightData } from '../shared/flight-data.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  flights: FlightData[] = [];
  readonly baseURL = 'http://localhost:3000/flights';

  constructor(private http: HttpClient) { }

  getSearchedFlights(source:string, destination:string) {
    return this.http.get(`${this.baseURL}/${source}/${destination}`);
  }

  getFlightList() {
    return this.http.get(`${this.baseURL}`);
  }
}
