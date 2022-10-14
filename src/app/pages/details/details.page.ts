import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MyToursService } from 'src/app/services/my-tours.service';
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from '@ionic/angular';
import { FavoritesService } from 'src/app/services/favorites.service';
import { MapPage } from '../map/map.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  tour = null;
  isFavorite: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mtService: MyToursService,
    private actionSheetCtrl: ActionSheetController,
    private favService: FavoritesService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tour = _.find(this.mtService.tours, ['ID', parseInt(id, 10)]);
    this.isFavorite = this.favService.favIDs.indexOf(parseInt(id, 10)) !== -1;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Tour',
      buttons: [
        {
          text: 'Request',
          handler: () => {
            window.location.href = '/request';
          },
        },
        {
          text: 'Map/Route',
          handler: () => {
            this.presentMap();
          },
        },
        {
          text: this.isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
          role: this.isFavorite ? 'destructive' : '',
          handler: () => {
            if (this.isFavorite) {
              // this.favService.remove(this.tour);
              // this.isFavorite = false;

              this.presentAlert();
            } else {
              this.favService.add(this.tour);
              this.isFavorite = true;
            }
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Remove Favorite?',
      message: 'Do you really want to remove this Favorite?',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.favService.remove(this.tour);
            this.isFavorite = false;
          },
        },
      ],
    });
    await alert.present();
  }

  async presentMap() {
    const modal = await this.modalCtrl.create({
      component: MapPage,
    });
    modal.present();
  }
}
