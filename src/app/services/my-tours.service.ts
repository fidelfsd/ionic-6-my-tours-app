import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FavoritesService } from './favorites.service';
import * as _ from 'lodash';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MyToursService {
  public regions: any;
  public tourtypes: any;
  public tours: any;

  constructor(
    private http: HttpClient,
    private favService: FavoritesService,
    private loadingCtrl: LoadingController
  ) {}

  async initialize() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading tour data...',
      spinner: 'crescent',
    });
    await loading.present();

    await this.getRegions()
      .toPromise()
      .then((data) => (this.regions = data))
      .catch((error) => console.log(error));

    await this.getTourTypes()
      .toPromise()
      .then((data) => (this.tourtypes = _.sortBy(data, 'Name')))
      .catch((error) => console.log(error));

    await this.getTours()
      .toPromise()
      .then((data) => {
        this.tours = _.sortBy(data, 'Title');
        this.favService.initialize(this.tours);
      })
      .catch((error) => console.log(error));

    await loading.dismiss();
  }

  getRegions(): Observable<any> {
    const requestUrl = `${environment.baseUrl}/Regions.json`;
    return this.http.get<any>(requestUrl);
  }

  getTourTypes(): Observable<any> {
    const requestUrl = `${environment.baseUrl}/Tourtypes.json`;
    return this.http.get<any>(requestUrl);
  }

  getTours(): Observable<any> {
    const requestUrl = `${environment.baseUrl}/Tours.json`;
    return this.http.get<any>(requestUrl);
  }
}
