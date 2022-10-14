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
    const removeIndex = this.favIDs.indexOf(tour.ID);
    if (removeIndex !== -1) {
      this.favIDs.splice(removeIndex, 1);
      this.favTours.splice(removeIndex, 1);
      window.localStorage.setItem(this.favKey, JSON.stringify(this.favIDs));

    }
  }

  reorder(ev) {
    ev.detail.complete(this.favTours);
    this.favIDs = this.favTours.map(tour => tour.ID);
    this.addToStorage(this.favKey, this.favIDs);
  }

  protected addToStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  protected getFromStorage(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }


}
