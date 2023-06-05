import { Injectable } from '@angular/core';
import * as globals from "../../globals";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baselink: string = globals.baseApi + '/clients';


  constructor(private http:HttpClient) { }

  createUser(user:any):Observable<any>{
    console.log(user)
    return this.http.post(this.baselink+'/create',user);
  }

  //Client client = clientService.findByEmail(data.get("oldEmail"));
  // client.setName(data.get("newName"));
  // client.setSurname(data.get("newSurname"));
  // client.setCountry(data.get("newCountry"));
  // client.setEmail(data.get("newEmail"));
  // client.setPassword(data.get("newPassword"));
  updateUser(user:any):Observable<any>{
    return this.http.patch(this.baselink+'/update',user);
  }


}
