import { Component, OnInit } from '@angular/core';
import { MyToursService } from 'src/app/services/my-tours.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-regions',
  templateUrl: './regions.page.html',
  styleUrls: ['./regions.page.scss'],
})
export class RegionsPage implements OnInit {

  regions: any;

  constructor(private mtService: MyToursService) { }

  ngOnInit() {
    this.getRegions();
  }

  getRegions() {

    this.regions = this.mtService.regions;

    this.regions.forEach(region => {
      const tours = _.filter(this.mtService.tours, ['Region', region.ID]);
      region.count = tours.length;
    });

  }

}
