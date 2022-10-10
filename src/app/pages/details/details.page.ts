import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MyToursService } from 'src/app/services/my-tours.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  tour = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mtService: MyToursService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tour = _.find(this.mtService.tours, ['ID', parseInt(id, 10)]);
  }

}
