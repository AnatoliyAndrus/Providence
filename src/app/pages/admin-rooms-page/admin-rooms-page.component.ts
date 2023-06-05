import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HotelService} from "../../services/hotel.service";
import {RoomService} from "../../services/room.service";
import {Hotel} from "../../models/Hotel";
import {AbstractControl, FormControl, FormGroup, NgForm, ValidatorFn, Validators} from "@angular/forms";
import {phoneRegex} from "../../../globals";
import {Room} from "../../models/Room";


@Component({
  selector: 'app-admin-rooms-page',
  templateUrl: './admin-rooms-page.component.html',
  styleUrls: ['./admin-rooms-page.component.css']
})
export class AdminRoomsPageComponent implements OnInit, OnDestroy{
  mode:'add'|'change' = 'add';
  currentHotelAddress:string='';
  addressForm:FormGroup;

  roomAddForm:FormGroup;
  roomEditForm:FormGroup;

  subscriptions:Subscription[] = [];
  hotels:string[] = [];
  rooms:Observable<Room[]> = new Observable<Room[]>();

  constructor(private hotelService:HotelService, private roomService:RoomService) {
    this.addressForm = new FormGroup(
      {address: new FormControl(null, [Validators.required, this.inputNotInArray()])}
    );

    this.roomAddForm = new FormGroup({
      number: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      capacity: new FormControl(null, [Validators.required]),
      //hotelAddress: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required])
    });
    this.roomEditForm = new FormGroup({
      //hotelAddress: new FormControl(null, [Validators.required]),
      oldNumber: new FormControl(null, [Validators.required]),
      newNumber: new FormControl(null, [Validators.required]),
      newPrice: new FormControl(null, [Validators.required]),
      newCapacity: new FormControl(null, [Validators.required]),
      newImage: new FormControl(null)
    });
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
  onSubmitAddress() {
    this.currentHotelAddress=this.addressForm.value.address;
    this.fetchRooms();
  }
  inputNotInArray(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!this.hotels.includes(control.value)) {
        return { inputNotInArray: true };
      }
      return null;
    };
  }


  onRoomAddSubmit(){
      this.subscriptions.push(this.roomService.createRoom({
        number:this.roomAddForm.value.number as string,
        price:this.roomAddForm.value.price as string,
        capacity:this.roomAddForm.value.capacity as string,
        image:this.fileData,
        hotelAddress:this.currentHotelAddress,
      }).subscribe(
        response => {
          if (response) {
            this.fetchRooms();
            this.roomAddForm.reset();
          } else {
            alert('Something wicked')
          }
        },
        error => {
          console.log('Error:', error);
          alert('Some error happened.');
        }
      ));
  }
  // hotelAddress:string,
  // oldNumber:any,
  // newNumber:any,
  // newPrice:any,
  // newCapacity:any,
  // newImage:string
  onRoomEditSubmit(){
    this.subscriptions.push(this.roomService.updateRoom({
      oldNumber:this.roomEditForm.value.oldNumber as string,
      newNumber:this.roomEditForm.value.newNumber as string,
      newPrice:this.roomEditForm.value.newPrice as string,
      newCapacity:this.roomEditForm.value.newCapacity as string,
      newImage:this.fileData,
      hotelAddress:this.currentHotelAddress,
    }).subscribe(
      response => {
        if (response) {
          this.fetchRooms();
          this.roomEditForm.reset();
          this.mode='add';
        } else {
          alert('Something wicked')
        }
      },
      error => {
        console.log('Error:', error);
        alert('Some error happened.');
      }
    ));
  }
  fetchRooms(){
    this.rooms = this.hotelService.getAllRooms({address:this.currentHotelAddress});
  }


  editRoom(room:Room){
    this.fileData=room.image;
    this.mode = 'change';
    this.roomEditForm.patchValue({
      oldNumber:room.number,
      newNumber:room.number,
      newPrice:room.price,
      newCapacity:room.capacity
    });
  }
  deleteRoom(room:Room){
    this.subscriptions.push(this.roomService.deleteRoom({hotelAddress:this.currentHotelAddress, roomNumber: room.number}).subscribe(
      response => {
        if (response) {
          this.fetchRooms();
        } else {
          alert('Something wicked is coming');
        }
      },
      error => {
        console.log('Error:', error);
        alert('Some error happened. hotel can\'t be deleted');
      }
    ));
  }

  fileData:string='';
  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = (e: any) => {
      const res = reader.result as string;
      this.fileData =  res.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '');
    };
    reader.readAsDataURL(file);
  }

}

