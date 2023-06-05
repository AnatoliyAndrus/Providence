import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {phoneRegex} from "../../../globals";
import {HotelService} from "../../services/hotel.service";
import {RoomService} from "../../services/room.service";
import {Subscription} from "rxjs";
import {Room} from "../../models/Room";
import { DatePipe } from '@angular/common';
import {MatNativeDateModule} from '@angular/material/core';
import {UserService} from "../../services/user.service";
import {MatButton} from "@angular/material/button";
import {BookingsService} from "../../services/bookings.service";


@Component({
  selector: 'app-user-booking-page',
  templateUrl: './user-booking-page.component.html',
  styleUrls: ['./user-booking-page.component.css']
})
export class UserBookingPageComponent implements OnInit, OnDestroy{

  minDate:Date;
  searchForm:FormGroup;
  roomsDepicted:boolean=false;
  subscriptions:Subscription[] = [];
  hotels:string[]=[];
  roomsChosen:Room[]=[]

  constructor(private hotelService:HotelService, private roomService:RoomService, private datePipe: DatePipe, private userService:UserService,
  private bookingsService:BookingsService) {
    this.searchForm = new FormGroup({
      hotelAddress: new FormControl(null, [Validators.required, this.inputNotInArray()]),
      checkIn: new FormControl(null, [Validators.required]),
      checkOut: new FormControl(null, [Validators.required]),
      adults: new FormControl(null, [Validators.required]),
      priceMin: new FormControl(null),
      priceMax: new FormControl(null)
    });
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate()-1);
  }

  ngOnInit(): void {
    this.subscriptions.push(this.hotelService.getAllHotels().subscribe(
      data => {
        this.hotels = data.map(h => h.address);
      },
      error => {
        alert('cant fetch hotels');
      }
    ));
    //this.hotels = this.hotelService.getAllHotels();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  inputNotInArray(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!this.hotels.includes(control.value)) {
        return { inputNotInArray: true };
      }
      return null;
    };
  }

  onSubmit(){
    this.savedFilterData={
      hotelAddress:this.searchForm.value.hotelAddress,
      checkIn: this.datePipe.transform(this.searchForm.value.checkIn, 'yyyy-MM-dd'),
      checkOut: this.datePipe.transform(this.searchForm.value.checkOut, 'yyyy-MM-dd'),
      adults:this.searchForm.value.adults,
      priceMin:this.searchForm.value.priceMin,
      priceMax:this.searchForm.value.priceMax};
    this.subscriptions.push(this.roomService.getFilteredRooms(
      this.savedFilterData
    ).subscribe(
      response => {
        console.log(response)
        this.roomsChosen=response;
        this.roomsDepicted=true;
      },
      error => {
        console.log('Error:', error);
        alert('Some error happened.');
      }
    ));
  }

  changeMinPrice(){
    if(this.searchForm.value.priceMin>this.searchForm.value.priceMax) this.searchForm.patchValue({
      priceMax:this.searchForm.value.priceMin
    });
  }
  changeMaxPrice(){
    if(this.searchForm.value.priceMin>this.searchForm.value.priceMax) this.searchForm.patchValue({
      priceMin:this.searchForm.value.priceMax
    });
  }

  myFilter = (d: Date | null): boolean => {
    return (d!==null)&&d>=this.minDate;
  };

  savedFilterData?:any;

  // reservation.setAdults(Integer.parseInt(data.get("adults")));
  // reservation.setReservationPrice(new BigDecimal(data.get("reservationPrice")));
  // reservation.setCheckIn(Date.valueOf(data.get("checkIn")));
  // reservation.setCheckOut(Date.valueOf(data.get("checkOut")));
  //
  // String clientEmail = data.get("clientEmail");
  //
  // String hotelAddress = data.get("hotelAddress");
  // Integer roomNumber = Integer.parseInt(data.get("roomNumber"));
  onBook(button: MatButton, room: Room){
    this.subscriptions.push(
      this.bookingsService.createReservation(
        {
          adults:this.savedFilterData.adults,
          reservationPrice:room.price,
          checkIn:this.savedFilterData.checkIn,
          checkOut:this.savedFilterData.checkOut,
          clientEmail:this.userService.getEmail(),
          hotelAddress:this.savedFilterData.hotelAddress,
          roomNumber:room.number
        }
      ).subscribe(
        (response)=>{
          button.disabled=true;
        },
        error => {
          console.log(error);
          alert(error);
        }
      )
    )
  }

}
