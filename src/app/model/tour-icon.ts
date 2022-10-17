import * as L from 'leaflet';
import { environment } from 'src/environments/environment';

export class TourIcon extends L.Icon {
  options: L.IconOptions;

  constructor(
    options: L.IconOptions = {
      iconUrl: `${environment.baseMarkerIconUrl}/tour.png`,
      iconSize: [35, 52],
      iconAnchor: [15, 55],
      shadowUrl: `${environment.baseMarkerIconUrl}/shadow.png`,
      shadowSize: [41, 41],
      shadowAnchor: [9, 45],
      popupAnchor: [3, -50],
    }
  ) {
    super(options);
  }
}
