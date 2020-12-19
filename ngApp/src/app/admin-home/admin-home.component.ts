import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { AdminService } from '../shared/admin.service';


import { FlightData } from '../shared/flight-data.model';

declare var M: any;

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  providers: [AdminService]
})
export class AdminHomeComponent implements OnInit {

  constructor(public _authService: AuthService, public adminService: AdminService) { }

  private _isEdit = false;
  ngOnInit(): void {
    //console.log('inside admin');
    this.resetForm();
    this.refreshFlightList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.adminService.selectedFlight = {
      _id: "",
      airLine: "",
      flightName: "",
      source: "",
      destination: "",
      fare: 0
    }
  }



  onSubmit(form: NgForm) {
    if (!this._isEdit) {
      console.log('inside if');
      this.adminService.postFlight(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshFlightList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      console.log('inside else');
      this.adminService.putFlight(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshFlightList();
        this._isEdit = false;
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }


  refreshFlightList() {
    this.adminService.getFlightList().subscribe((res) => {
      this.adminService.flights = res as FlightData[];
    });
  }

  onEdit(f: FlightData) {
    this._isEdit = true;
    this.adminService.selectedFlight = f;
  }

  onDelete(flightName: string, form: NgForm) {
    // if (confirm('Are you sure to delete this record ?') == true) {
    //   this.adminService.deleteFlight(flightName).subscribe((res) => {
    //     this.refreshFlightList();
    //     this.resetForm(form);
    //     M.toast({ html: 'Deleted successfully', classes: 'rounded' });
    //   });
    // }
    this.adminService.deleteFlight(flightName).subscribe((res) => {
      this.refreshFlightList();
      this.resetForm(form);
      M.toast({ html: 'Deleted successfully', classes: 'rounded' });
    });
  }

}
