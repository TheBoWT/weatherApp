import { Injectable,  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class WeatherService {

 url = 'https://api.openweathermap.org/data/2.5/weather';
 apiKey = '81f016c37ac4aa189bb6af59e425894b';

constructor(private http:HttpClient) { }

getWeatherDataByCoords(lat, lng){
  const params = new HttpParams()
  .set('lat', lat)
  .set('lon', lng)
  .set('units', 'imperial')
  .set('appid', this.apiKey);

  return this.http.get(this.url, { params });
}

getWeatherDataByCityName(city: string){
  const params = new HttpParams()
  .set('q', city)
  .set('units', 'imperial')
  .set('appid', this.apiKey);

  return this.http.get(this.url, { params });
}

}
