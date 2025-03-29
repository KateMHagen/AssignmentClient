import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherForecast } from './weather-forecast';
import { environment } from '../environments/environment.development';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { WeatherComponent } from "./weather/weather.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    NavBarComponent,
    RouterOutlet,
    
]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    
  }
  
  

  title = 'assignmentclient';
}