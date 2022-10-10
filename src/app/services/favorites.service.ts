import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  public favIDs: Array<any>;
  public favTours: Array<any>;
  private favKey = 'FavoritesIDs';

  constructor() { }

  initialize(tours) {
    this.favTours = [];
    this.favIDs = JSON.parse(window.localStorage.getItem(this.favKey));

    if (this.favIDs === null) {
      this.favIDs = [];
    } else {
      tours.forEach(tour => {
        if (this.favIDs.indexOf(tour.ID) !== -1) {
          this.favTours.push(tour);
        }
      });
    }
  }


  add(tour) {
    this.favIDs.push(tour.ID);
    this.favTours.push(tour);

    window.localStorage.setItem(this.favKey, JSON.stringify(this.favIDs));
  }

  remove(tour) {
    // TODO: implementar
  }


}
