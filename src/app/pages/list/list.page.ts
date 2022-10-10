import { Component, OnInit } from '@angular/core';
import { MyToursService } from 'src/app/services/my-tours.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  tours: any;
  selection: any;

  constructor(
    private mtService: MyToursService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getTour();
  }

  getTour() {
    this.selection = this.activatedRoute.snapshot.params;
    const category = this.selection.Category;
    const criteria = this.selection.Criteria;
    this.tours = _.filter(this.mtService.tours, [category, criteria]);

  }
}
