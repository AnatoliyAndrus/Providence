import { Injectable } from '@angular/core';
import * as globals from '../../globals';
import {Observable, of} from "rxjs";
import {Hotel} from "../models/Hotel";
import {HttpClient} from "@angular/common/http";
import {Room} from "../models/Room";
@Injectable({
  providedIn: 'root'
})
export class HotelService {
  baselink: string = globals.baseApi + '/hotels';

  constructor(private http: HttpClient) {
  }

  // getHeroes(): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl)
  //     .pipe(
  //       catchError(this.handleError<Hero[]>('getHeroes', []))
  //     );
  // }

  getAllHotels(): Observable<Hotel[]> {
    // return of([{address:'some', stars:5, phoneNumber:'14234123112'},
    //   {address:'someOther', stars:1, phoneNumber:'212311211'},
    //   {address:'stwf', stars:2, phoneNumber:'4891237189'},
    //   {address:'sadf', stars:4, phoneNumber:'5234123112'}]);
    return this.http.get<Hotel[]>(this.baselink + '/getAll');
  }

  createHotel(hotel:Hotel):Observable<any>{
    return this.http.post(this.baselink+'/create',hotel);
  }

  updateHotel(hotel:any):Observable<any>{
    return this.http.patch(this.baselink+'/update',hotel);
  }

  deleteHotel(data:{address:string}):Observable<any>{
    return this.http.put(this.baselink+'/delete', data);
  }


  getAllRooms(data:{address:string}):Observable<Room[]>{
    return this.http.post<Room[]>(this.baselink+'/getAllRooms', data);
  }


}
