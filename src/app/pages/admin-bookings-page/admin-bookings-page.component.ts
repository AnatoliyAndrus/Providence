import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Hotel} from "../../models/Hotel";
import {HotelService} from "../../services/hotel.service";
import {RoomService} from "../../services/room.service";
import {Room} from "../../models/Room";
import {BookingsService} from "../../services/bookings.service";

@Component({
  selector: 'app-admin-bookings-page',
  templateUrl: './admin-bookings-page.component.html',
  styleUrls: ['./admin-bookings-page.component.css']
})
export class AdminBookingsPageComponent implements OnInit, OnDestroy{

  constructor(private hotelService:HotelService, private roomService:RoomService, private bookingsService:BookingsService) {

  }

  hotels:Observable<Hotel[]> = new Observable();
  rooms:Observable<Room[]> = new Observable();
  bookings:Observable<any[]> = new Observable();
  address:string='';
  number:number=0;
  subs:Subscription[] = [];

  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe());
  }
  ngOnInit(): void {
    this.hotels = this.hotelService.getAllHotels();
  }
  onChooseHotel(){
    this.rooms = this.hotelService.getAllRooms({address:this.address});
  }
  onChooseRoom(){
    if(this.address!==''){
      this.fetchBookings();
    }
  }
  deleteBooking(booking: any) {
    this.subs.push(
      this.bookingsService.deleteBooking({reservationId:booking.id}).subscribe(
        () => this.fetchBookings()
      )
    )
  }

  fetchBookings(){
    this.bookings=this.bookingsService.getAllByHotelAndNumber({hotelAddress:this.address, roomNumber:this.number});
  }
}
