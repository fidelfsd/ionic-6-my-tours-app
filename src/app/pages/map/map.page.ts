import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: L.Map;
  constructor(private geolocation: Geolocation) {}

  ngOnInit() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        // resp.coords.latitude
        console.log(
          '🚀 ~ file: map.page.ts ~ line 18 ~ MapPage ~ .then ~ resp.coords.latitude',
          resp.coords.latitude
        );
        // resp.coords.longitude
        console.log(
          '🚀 ~ file: map.page.ts ~ line 22 ~ MapPage ~ .then ~ resp.coords.longitude',
          resp.coords.longitude
        );
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });

    setTimeout(() => {
      this.map.invalidateSize(true);
    }, 200);

    this.renderMap();
  }

  renderMap() {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.marker([51.5, -0.09])
      .addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }
}
