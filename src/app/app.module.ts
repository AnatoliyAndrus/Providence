import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {DatePipe, NgIf} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectCountryModule} from "@angular-material-extensions/select-country";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { UserPageComponent } from './pages/user-page/user-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { AdminHotelsPageComponent } from './pages/admin-hotels-page/admin-hotels-page.component';
import { AdminRoomsPageComponent } from './pages/admin-rooms-page/admin-rooms-page.component';
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { UserBookingPageComponent } from './pages/user-booking-page/user-booking-page.component';
import { UserMyBookingsPageComponent } from './pages/user-my-bookings-page/user-my-bookings-page.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import { AdminBookingsPageComponent } from './pages/admin-bookings-page/admin-bookings-page.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    LoginPageComponent,
    AdminPageComponent,
    UserPageComponent,
    AdminHomePageComponent,
    AdminHotelsPageComponent,
    AdminRoomsPageComponent,
    UserBookingPageComponent,
    UserMyBookingsPageComponent,
    AdminBookingsPageComponent,
    UserHomePageComponent
  ],
    imports: [
        MatNativeDateModule,
        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        MatIconModule,
        MatSelectCountryModule,
        MatButtonModule,
        MatGridListModule,
        MatDividerModule,
        MatToolbarModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatCardModule
    ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
