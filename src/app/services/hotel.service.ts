import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/publishReplay';
import { AppConfig } from './../config/app.config';

const data = {
  hotels:  [
    {
      _id: '5e43b1a3e112ec0461f766b3',
      name: 'Hotel Grand Hyatt',
      price: 700,
      city: 'Dubai',
      availability: [
        {
          from: '2020-10-05T11:12:23.000+0000',
          to: '2020-10-10T11:12:23.000+0000'
        },
        {
          from: '2020-10-15T11:12:23.000+0000',
          to: '2020-10-25T11:12:23.000+0000'
        }
      ]
    },
    {
      _id: '5e43d9ea2bcc31027102666a',
      name: 'Al Bateen Hotel',
      price: 600,
      city: 'Abu Dhabi',
      availability: [
        {
          from: '2020-10-05T11:12:23.000+0000',
          to: '2020-10-10T11:12:23.000+0000'
        },
        {
          from: '2020-10-15T11:12:23.000+0000',
          to: '2020-10-25T11:12:23.000+0000'
        }
      ]
    },
    {
      _id: '5e43da502bcc31027102666b',
      name: 'Al Reem Hotel',
      price: 600,
      city: 'Abu Dhabi',
      availability: [
        {
          from: '2020-10-05T11:12:23.000+0000',
          to: '2020-10-10T11:12:23.000+0000'
        }
      ]
    }
  ],
  hotelsCount: 40
}

@Injectable()
export class HotelService {
  constructor(private http: HttpClient) {}

  create(hotelObj) {
    return this.http
      .post(`${AppConfig.apiUrl}/hotels`, hotelObj)
      .map(res => res)
      .catch(this.handleObservableError);
  }

  update(hotelObj) {
    return this.http
      .put(`${AppConfig.apiUrl}/hotels`, hotelObj)
      .map(res => res)
      .catch(this.handleObservableError);
  }

  delete(hotelId) {
    return this.http
      .delete(`${AppConfig.apiUrl}/hotels/${hotelId}`)
      .map(res => res)
      .catch(this.handleObservableError);
  }

  getHotels(filters?) {
    return this.http
      .get(`${AppConfig.apiUrl}/hotels`, { params: filters })
      .map((res: any) => {
        return res;
      })
      .publishReplay(1)
      .refCount()
      .catch(this.handleObservableError);
  }

  getHotelById(hotelId) {
    return this.http
      .get(`${AppConfig.apiUrl}/hotels/${hotelId}`)
      .map((res: any) => {
        return res;
      })
      .publishReplay(1)
      .refCount()
      .catch(this.handleObservableError);
  }
  handleObservableError(error: any) {
    return Observable.throw(error);
  }
}
