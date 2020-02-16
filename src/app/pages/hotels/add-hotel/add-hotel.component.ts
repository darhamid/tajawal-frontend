import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../../../services/confirm-dialog.service';
import { HotelService } from '../../../services/hotel.service';
import { Hotel } from '../../../models/hotel.model';


import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './../../../common/custom-datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class AddHotelComponent implements OnInit {
  private addHotelForm;
  private availability;
  private hotelId = '';
  private hotel: Hotel;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private hotelServive: HotelService,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.addHotelForm = this.formBuilder.group({
      name: ['', [ Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      price: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      city: ['', [ Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      availability: this.formBuilder.array([this.createItem()])
    });
  }

  addItem(): void {
    this.availability = this.addHotelForm.get('availability') as FormArray;
    this.availability.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
        from: ['', [Validators.required]],
        to: ['', [Validators.required]]
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
    return this.addHotelForm.get('availability').controls;
  }

  cancelAdd() {
    this.router.navigate([`/`]);
  }

  saveHotel(formValues) {
    const hotelObj: Hotel = {... formValues };
    this.hotelServive.create(hotelObj).subscribe(
      savedHotel => {
        this.toastr.success('Hotel added successfully');
        this.router.navigate([`/`]);
      },
      error => this.toastr.error('Failed to add hotel.')
    );
  }

}
