import { Injectable } from '@angular/core';
import * as globals from "../../globals";
import {Hotel} from "../models/Hotel";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Room} from "../models/Room";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baselink: string = globals.baseApi + '/rooms';

  constructor(private http:HttpClient) { }

  createRoom(room:any):Observable<any>{
    console.log(room)
    return this.http.post(this.baselink+'/create',room);
  }


  updateRoom(room:{
    hotelAddress:string,
    oldNumber:any,
    newNumber:any,
    newPrice:any,
    newCapacity:any,
    newImage:string
  }):Observable<any>{
    return this.http.patch(this.baselink+'/update',room);
  }

  deleteRoom(data:{
    hotelAddress:string,
    roomNumber:number
  }):Observable<any>{
    return this.http.put(this.baselink+'/delete', data);
  }
}
