import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";
import {UserPageComponent} from "./pages/user-page/user-page.component";
import {AdminHomePageComponent} from "./pages/admin-home-page/admin-home-page.component";
import {AdminHotelsPageComponent} from "./pages/admin-hotels-page/admin-hotels-page.component";
import {AdminRoomsPageComponent} from "./pages/admin-rooms-page/admin-rooms-page.component";
import {UserBookingPageComponent} from "./pages/user-booking-page/user-booking-page.component";
import {UserMyBookingsPageComponent} from "./pages/user-my-bookings-page/user-my-bookings-page.component";
import {AdminBookingsPageComponent} from "./pages/admin-bookings-page/admin-bookings-page.component";

const routes: Routes = [
  {path:'register', component:RegisterPageComponent},
  {path:'login', component:LoginPageComponent},
  {path:'admin', component:AdminPageComponent, children:[
      {path:'home', component:AdminHomePageComponent},
      {path:'hotels', component:AdminHotelsPageComponent},
      {path:'rooms', component:AdminRoomsPageComponent},
      {path:'bookings', component:AdminBookingsPageComponent}
    ]},
  {path:'user', component:UserPageComponent, children:[
      {path:'booking', component: UserBookingPageComponent},
      {path:'myBookings', component: UserMyBookingsPageComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
