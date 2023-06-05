import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  passwordMinLength:number = 6;
  hidePassword:boolean = false;
  reactiveForm: FormGroup;

  constructor() {
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
    });
  }

  noSpaceAllowed(control: FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1){
      return {noSpaceAllowed:true};
    }
    return null;
  }

  onFormSubmit(){
    console.log("lsgkjf")
    console.log(this.reactiveForm.value);
  }


}
