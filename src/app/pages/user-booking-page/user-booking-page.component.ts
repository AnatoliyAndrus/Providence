import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {phoneRegex} from "../../../globals";
import {HotelService} from "../../services/hotel.service";
import {RoomService} from "../../services/room.service";
import {Subscription} from "rxjs";
import {Room} from "../../models/Room";
import { DatePipe } from '@angular/common';
import {MatNativeDateModule} from '@angular/material/core';


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

  constructor(private hotelService:HotelService, private roomService:RoomService, private datePipe: DatePipe) {
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

  /**
   * @param data {
   *   hotelAddress
   *   checkIn
   *   checkOut
   *   adults
   *   priceMin
   *   priceMax
   * }
   */
  onSubmit(){
    this.subscriptions.push(this.roomService.getFilteredRooms(
      {
        hotelAddress:this.searchForm.value.hotelAddress,
        checkIn: this.datePipe.transform(this.searchForm.value.checkIn, 'yyyy-MM-dd'),
        checkOut: this.datePipe.transform(this.searchForm.value.checkOut, 'yyyy-MM-dd'),
        adults:this.searchForm.value.adults,
        priceMin:this.searchForm.value.priceMin,
        priceMax:this.searchForm.value.priceMax,
      }
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

}
