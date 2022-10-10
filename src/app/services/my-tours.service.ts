import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyToursService {

  public regions: any;
  public tourtypes: any;

  constructor(private http: HttpClient) { }

  initialize() {
    this.getRegions().subscribe({
      next: data => {
        this.regions = data;
      },
      error: err => {
        console.error(err);
      }
    });

    this.getTourTypes().subscribe({
      next: data => {
        this.tourtypes = data;
      },
      error: err => {
        console.error(err);
      }
    });

  }

  getRegions(): Observable<any> {
    const requestUrl = `${environment.baseUrl}/Regions`;
    return this.http.get<any>(requestUrl);
  }

  getTourTypes(): Observable<any> {
    const requestUrl = `${environment.baseUrl}/Tourtypes`;
    return this.http.get<any>(requestUrl);
  }
}
