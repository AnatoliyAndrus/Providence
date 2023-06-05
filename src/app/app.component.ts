import { Component } from '@angular/core';
import {MatSelectCountryLangToken} from "@angular-material-extensions/select-country";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: MatSelectCountryLangToken, useValue: 'uk' }
  ]
})
export class AppComponent {
  title = 'Providence';
}
