import { Component, OnInit } from '@angular/core';
import { MyToursService } from 'src/app/services/my-tours.service';


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
    // this.mtService.getRegions().subscribe({
    //   next: data => {
    //     this.regions = data;
    //     // console.log(data);  TODO:
    //   },
    //   error: err => {
    //     console.error(err);
    //   }
    // });
  }

}
