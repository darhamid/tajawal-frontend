import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '../../../services/confirm-dialog.service';
import { HotelService } from '../../../services/hotel.service';
import { Subscription } from 'rxjs';
import { Hotel } from '../../../models/hotel.model';


import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './../../../common/custom-datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class HotelComponent implements OnInit {
  private editHotelForm;
  private availability;
  private sub: Subscription;
  private hotelId = '';
  private hotel: Hotel;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private hotelServive: HotelService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.initializeForm();
    this.sub = this.route.params.subscribe(params => {
      this.hotelId = params.id;
      this.hotelServive.getHotelById(this.hotelId).subscribe((hotel:Hotel) => {
        this.setFormData(hotel);
      });
    });
  }

  private initializeForm(): void {
    this.editHotelForm = this.formBuilder.group({
      name: ['', [ Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      price: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      city: ['', [ Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      availability: this.formBuilder.array([])
    });
  }

  private setFormData(hotel: Hotel) {
    this.editHotelForm.setValue({
      name: hotel.name,
      price: hotel.price,
      city: hotel.city,
      availability: []
    });
    this.setAvailability(hotel.availability);
  }

  setAvailability(availability) {

    for(const dateAvailable of availability ) {
      dateAvailable.from = new Date(dateAvailable.from);
      dateAvailable.to = new Date(dateAvailable.to);
      this.addItem(dateAvailable);
    };
  }

  addItem(dateAvailable ): void {
    this.availability = this.editHotelForm.get('availability') as FormArray;
    this.availability.push(this.createItem(dateAvailable));
  }

  createItem(dateAvailable): FormGroup {
    return this.formBuilder.group({
        from: [dateAvailable?.from, [Validators.required]],
        to: [dateAvailable?.to, [Validators.required]]
    });
  }

  removeAvailability(index): void {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to remove available dates ?')
    .then((confirmed) => {
      if( confirmed ) {
        this.availability.removeAt(index);
      }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  getControls() {
    return this.editHotelForm.get('availability').controls;
  }

  cancelEdit() {
    this.router.navigate([`/`]);
  }

  updateHotel(formValues) {
    const updatedValues = { _id: this.hotelId, ... formValues };
    this.hotelServive.update(updatedValues).subscribe(
      updatedHotel => {
        this.toastr.success('Hotel updated successfully');
        this.router.navigate([`/`]);
      },
      error => this.toastr.error('Failed to update hotel.. Please try after some time.')
    );
  }

}
