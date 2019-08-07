import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  locationDeinedEnableCity = false;
  waiting = true;
  weather: any;
  latitude: number;
  longitude: number;
  errorMsg = '';
constructor(private weatherData: WeatherService) { }

ngOnInit(){
  this.getLocation()
}

getLocation(){
  if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition((success) =>{
    this.latitude = success.coords.latitude;
    this.longitude = success.coords.longitude;
    this.weatherData.getWeatherDataByCoords(this.latitude, this.longitude).subscribe(data =>{
    this.weather = data;
    });
  }, (error) =>{
    if(error.code == error.PERMISSION_DENIED){
      this.locationDeinedEnableCity = true;
      this.waiting = false;
    }
  });
  }
}

onMapClick(event){
  this.latitude = event.coords.lat;
  this.longitude = event.coords.lng;

  this.weatherData.getWeatherDataByCoords(this.latitude, this.longitude).subscribe(data =>{
  this.weather = data;
  });
}

getCity(city: HTMLInputElement){
  if(city.value != ''){
     this.weatherData.getWeatherDataByCityName(city.value).subscribe((data:any) =>{
      this.weather = data;
      this.latitude = data.coord.lat;
      this.longitude = data.coord.lon;
    },
    (err =>{
      this.errorMsg = err.statusText;
      this.weather = null;
    }))
  } else{
    this.errorMsg = 'Opps, you forgot to type in your city name!';
    city.focus();
  }

}

}


