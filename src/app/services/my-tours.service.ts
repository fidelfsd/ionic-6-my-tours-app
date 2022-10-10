import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyToursService {

  constructor(private http: HttpClient) { }

  getRegions(): Observable<any> {
    const requestUrl = `${environment.baseUrl}/Regions`;
    return this.http.get<any>(requestUrl);
  }
}
