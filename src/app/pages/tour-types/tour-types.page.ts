import { Component, OnInit } from '@angular/core';
import { MyToursService } from 'src/app/services/my-tours.service';

@Component({
  selector: 'app-tour-types',
  templateUrl: './tour-types.page.html',
  styleUrls: ['./tour-types.page.scss'],
})
export class TourTypesPage implements OnInit {

  tourtypes: any;

  constructor(private mtService: MyToursService) { }

  ngOnInit() {
    this.getTourTypes();
  }

  getTourTypes() {
    this.tourtypes = this.mtService.tourtypes;
  }

}
