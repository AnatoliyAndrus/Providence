import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnDestroy{

  passwordMinLength:number = 6;
  hidePassword:boolean = true;
  reactiveForm: FormGroup;
  invalidPasswordError:boolean=false;
  subs:Subscription[]=[];

  constructor(private userService:UserService, private router:Router) {
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub)=>{sub.unsubscribe()});
  }

  noSpaceAllowed(control: FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1){
      return {noSpaceAllowed:true};
    }
    return null;
  }

  onFormSubmit(){
    console.log(this.reactiveForm.value);
    this.subs.push(this.userService.authenticate(this.reactiveForm.value.email, this.reactiveForm.value.password).subscribe(
      (response)=>{
        this.userService.userLogin(response.authenticated, this.reactiveForm.value.email, response.role);
        if(this.userService.getRole()==='ADMIN') this.router.navigate(['/admin/home']);
        else if(this.userService.getRole()==='CLIENT') this.router.navigate(['/user/booking']);
      },
      error => {
        console.log(error);
        this.invalidPasswordError=true;
      }
    ));
  }


}
