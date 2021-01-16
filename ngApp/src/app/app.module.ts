import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
//import { UserHomeComponent } from './user-home/user-home.component';
//import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
//import { BookingComponent } from './booking/booking.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { WindowRefService } from './window-ref.service';
import { AdminService } from './shared/admin.service';
import { SearchService } from './search/search.service';
import { BookFlightService } from './bookService/book-flight.service';
//import { PaymentSuccessComponent } from './payment-success/payment-success.component';
//import { ViewBookingsComponent } from './view-bookings/view-bookings.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    // AdminHomeComponent,
    // BookingComponent,
    DialogLoginComponent,
    // ViewBookingsComponent
  ],
  entryComponents : [DialogLoginComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    WindowRefService,
    AdminService,
    SearchService,
    BookFlightService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
