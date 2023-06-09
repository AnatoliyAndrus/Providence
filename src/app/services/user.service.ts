import { Injectable } from '@angular/core';
import * as globals from "../../globals";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baselink: string = globals.baseApi + '/clients';


  constructor(private http:HttpClient) {

  }

  createUser(user:any):Observable<any>{
    return this.http.post(this.baselink+'/create',user);
  }

  updateUser(user:any):Observable<any>{
    return this.http.patch(this.baselink+'/update',user);
  }

  authenticate(email:string, password:string){
    return this.http.post<any>(this.baselink+'/authenticate', {email: email, password:password});
  }

  isAuthenticated():boolean{
    return localStorage.getItem('authenticated') === 'true';
  }
  setAuthenticated(authenticated:boolean){
    localStorage.setItem('authenticated', String(authenticated));
  }
  getEmail():string|null{
    return localStorage.getItem('email');
  }
  setEmail(email:string){
    localStorage.setItem('email', email);
  }
  getRole():string|null{
    return localStorage.getItem('role');
  }
  setRole(role:string){
    localStorage.setItem('role', role);
  }
  userLogin(authenticated:boolean, email:string, role:string){
    this.setAuthenticated(authenticated);
    this.setEmail(email);
    this.setRole(role);
  }
  userLogout(){
    localStorage.clear();
    localStorage.setItem('authenticated', 'false');
  }

  checkIfEmailExists(value: {email:string}) {
    return this.http.post<any>(this.baselink+'/emailAlreadyOccupied', value);
  }
}
