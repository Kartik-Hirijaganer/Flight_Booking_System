import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookFlightService } from '../bookService/book-flight.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  


  constructor(public bookFlightService: BookFlightService) { }
  print(){
    printJS({
       printable: 'printJS-form',
        type: 'html',
        targetStyles: ['*']
      });
  }
  ngOnInit(): void {
  }

  
}
