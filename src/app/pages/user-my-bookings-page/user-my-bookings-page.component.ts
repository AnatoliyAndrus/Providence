import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingsService} from "../../services/bookings.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-user-my-bookings-page',
  templateUrl: './user-my-bookings-page.component.html',
  styleUrls: ['./user-my-bookings-page.component.css']
})
export class UserMyBookingsPageComponent implements OnInit, OnDestroy{

  currentDate:number = new Date().setHours(0,0,0,0);
  bookings:Observable<any[]> = new Observable<any[]>();
  subs:Subscription[] = [];

  constructor(private bookingsService:BookingsService) {}

  fetchBookings(){
    this.bookings=this.bookingsService.getBookingsOfClient();
  }

  ngOnInit(): void {
    this.fetchBookings();
  }

  deleteBooking(booking: any) {
    this.subs.push(
      this.bookingsService.deleteBooking({reservationId:booking.id}).subscribe(
        () => this.fetchBookings()
      )
    )
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub=>sub.unsubscribe());
  }

  isOld(checkIn: string): boolean{
    let checkInDate = new Date(checkIn);
    return checkInDate.getTime() < this.currentDate;
  }
}
