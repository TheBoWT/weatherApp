import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  location: boolean = false;
  locationDeined: boolean = true;
  weather: any;
  latitude: number;
  longitude: number;

constructor(private weatherData: WeatherService) { }

ngOnInit(){
  this.getLocation()
}
getLocation(){
  if("geolocation" in navigator){
    navigator.geolocation.watchPosition((success) =>{
    this.location = true;
    this.latitude = success.coords.latitude;
    this.longitude = success.coords.longitude;
    this.weatherData.getWeatherDataByCoords(this.latitude, this.longitude).subscribe(data =>{
    this.weather = data;
    });
  }, (error) =>{
    if(error.code == error.PERMISSION_DENIED){
      console.log('deined');
      this.locationDeined = false;

    }
  });
  }
}

onLocation(event){
  this.latitude = event.coords.lat;
  this.longitude = event.coords.lng;

  this.weatherData.getWeatherDataByCoords(this.latitude, this.longitude).subscribe(data =>{
  this.weather = data;
  });
}
getCity(city: string){
  this.weatherData.getWeatherDataByCityName(city).subscribe(data =>{
    this.weather = data;
    this.latitude = data.coord.lat;
    this.longitude = data.coord.lon;
    });
}

}


