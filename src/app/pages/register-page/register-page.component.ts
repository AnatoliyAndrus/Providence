import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnDestroy{

  passwordMinLength:number;
  hidePassword:boolean = true;
  reactiveForm: FormGroup;

  subscriptions:Subscription[]=[];

  constructor(private router:Router, private userService:UserService) {
    this.passwordMinLength=6;
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
    if(control.value != null && control.value.length<=6){
      return {minPassLength:true};
    }
    return null;
  }

  onFormSubmit(){
    this.subscriptions.push(
      this.userService.createUser({
        name:this.reactiveForm.value.name,
        surname:this.reactiveForm.value.surname,
        email:this.reactiveForm.value.email,
        password:this.reactiveForm.value.password,
        country:this.reactiveForm.value.country.name,
      }).subscribe(
        (response)=>{
          if(response){
            this.router.navigate(['/login']);
          }else{
            console.log('some error happened')
          }
        },
        (error)=>{
          console.log(error)}
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
