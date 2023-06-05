import { Injectable } from '@angular/core';
import * as globals from "../../globals";
import {Hotel} from "../models/Hotel";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Room} from "../models/Room";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  baselink: string = globals.baseApi + '/reservations';

  constructor(private http:HttpClient, private userService:UserService) { }

  createReservation(reservation:any):Observable<any>{
    return this.http.post(this.baselink+'/create',reservation);
  }

// /byClientEmail

  getBookingsOfClient():Observable<any[]>{
    return this.http.post<any[]>(this.baselink+'/byClientEmail', {clientEmail:this.userService.getEmail()});
  }

  deleteBooking(data:{reservationId:number}):Observable<any>{
    return this.http.put(this.baselink+'/delete', data);
  }

  // String hotelAddress = data.get("hotelAddress");
  // Integer roomNumber = Integer.parseInt(data.get("roomNumber"));
  getAllByHotelAndNumber(data:{hotelAddress:string, roomNumber:number}):Observable<any[]>{
    return this.http.post<any[]>(this.baselink+'/byHotelAndNumber', data);
  }
}
