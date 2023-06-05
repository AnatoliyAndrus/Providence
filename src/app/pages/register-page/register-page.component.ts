import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  passwordMinLength:number = 6;
  hidePassword:boolean = false;
  reactiveForm: FormGroup;

  constructor() {
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
      surname: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, this.minPassLength, this.noSpaceAllowed, Validators.pattern(/^\S*$/)]),
      country: new FormControl(null, [Validators.required])
    });
  }

  noSpaceAllowed(control: FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1){
      return {noSpaceAllowed:true};
    }
    return null;
  }

  minPassLength(control: FormControl){
    if(control.value != null && control.value.length<=this.passwordMinLength){
      return {minPassLength:true};
    }
    return null;
  }

  onFormSubmit(){
    console.log("lsgkjf")
    console.log(this.reactiveForm.value);
  }


}
