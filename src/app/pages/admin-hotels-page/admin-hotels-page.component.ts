import {Component, OnDestroy, OnInit} from '@angular/core';
import {HotelService} from "../../services/hotel.service";
import {Hotel} from "../../models/Hotel";
import {Observable, of, Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {phoneRegex} from "../../../globals";

@Component({
  selector: 'app-admin-hotels-page',
  templateUrl: './admin-hotels-page.component.html',
  styleUrls: ['./admin-hotels-page.component.css']
})
export class AdminHotelsPageComponent implements OnInit, OnDestroy{

  mode:'add'|'change' = 'add';
  hotelAddForm:FormGroup;
  hotelEditForm:FormGroup;

  hotels$?:Observable<Hotel[]>;
  currentHotel:Hotel={address:'', phoneNumber:'', stars:1};
  addSubscription:Subscription=new Subscription();
  editSubscription:Subscription=new Subscription();
  deleteSubscription:Subscription=new Subscription();

  constructor(private hotelService:HotelService) {
    this.hotelAddForm = new FormGroup({
      address: new FormControl(null, [Validators.required]),
      stars: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, this.invalidPhone,Validators.pattern(phoneRegex)]),
    });
    this.hotelEditForm = new FormGroup({
      address: new FormControl(null),
      newStars: new FormControl(null, [Validators.required]),
      newPhone: new FormControl(null, [Validators.required, this.invalidPhone,Validators.pattern(phoneRegex)]),
    });
  }

  ngOnDestroy(): void {
        this.deleteSubscription.unsubscribe();
        this.editSubscription.unsubscribe();
        this.addSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchHotels();
  }

  fetchHotels(){
    this.hotels$ = this.hotelService.getAllHotels();
  }

  onAddSubmit(){
    this.addSubscription=this.hotelService.createHotel(this.hotelAddForm.value).subscribe(
      response => {
        if (response) {
          this.fetchHotels();
          this.hotelAddForm.reset();
        } else {
          alert('Something wicked')
        }
      },
      error => {
        console.log('Error:', error);
        alert('Some error happened.');
      }
    );
  }


  onEditSubmit(){
    this.editSubscription=this.hotelService.updateHotel(this.hotelEditForm.value).subscribe(
      response => {
        if (response) {
          this.hotelEditForm.reset();
          this.mode='add';
          this.fetchHotels();
        } else {
          alert('I dont know how you received this message');
        }
      },
      error => {
        console.log('Error:', error);
        alert('Some error happened.');
      }
    );
  }


  invalidPhone(control: FormControl){
    if(control.value != null && !phoneRegex.test(control.value)){
      return {invalidPhone:true};
    }
    return null;
  }

  editHotel(hotel:Hotel){
    this.mode = 'change';
    this.hotelEditForm.patchValue({
      address:hotel.address,
      newStars:hotel.stars,
      newPhone:hotel.phoneNumber,
    });
  }
  deleteHotel(hotel:Hotel){
    this.deleteSubscription=this.hotelService.deleteHotel({address: hotel.address}).subscribe(
      response => {
        if (response) {
          this.fetchHotels();
        } else {
          alert('Something wicked is coming');
        }
      },
      error => {
        console.log('Error:', error);
        alert('Some error happened. hotel can\'t be deleted');
      }
    );
  }
}
