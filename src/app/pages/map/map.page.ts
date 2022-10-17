import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
import { TourIcon } from 'src/app/model/tour-icon';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: L.Map;
  coords: any = {};
  constructor(
    private geolocation: Geolocation,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    L.Icon.Default.imagePath = 'assets/leaflet/';

    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        // resp.coords.latitude
        this.coords.lat = resp.coords.latitude;
        // console.log(
        //   '🚀 ~ file: map.page.ts ~ line 18 ~ MapPage ~ .then ~ resp.coords.latitude',
        //   resp.coords.latitude
        //);
        // resp.coords.longitude
        this.coords.lon = resp.coords.longitude;
        // console.log(
        //   '🚀 ~ file: map.page.ts ~ line 22 ~ MapPage ~ .then ~ resp.coords.longitude',
        //   resp.coords.longitude
        // );
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
    this.calcRoute();
  }

  calcRoute() {
    L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: `http://router.project-osrm.org/route/v1/`,
      }),
      showAlternatives: true,
      fitSelectedRoutes: false,
      lineOptions: {
        // eslint-disable-next-line max-len
        styles: [
          { color: 'black', opacity: 0.25, weight: 12 },
          { color: 'white', opacity: 0.8, weight: 7 },
          { color: '#490a3d', opacity: 0.9, weight: 4 },
        ],
        extendToWaypoints: true,
        missingRouteTolerance: 2,
      },
      show: false,
      routeWhileDragging: true,
      waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
    }).addTo(this.map);
  }

  renderMap() {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    // tiles
    const defaultTileLayer = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    L.tileLayer(defaultTileLayer, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      // tileSize: 512, //mapbox
      // zoomOffset: -1, //mapbox
    }).addTo(this.map);

    // markers
    const tourIcon = new TourIcon();
    L.marker([51.505, -0.09], {
      icon: tourIcon,
    })
      .addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
