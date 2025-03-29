import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment.development"; 
import { WeatherForecast } from "../weather-forecast";


@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {
public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>(`${environment.baseUrl}/weatherforecast`).subscribe({
      next: result => this.forecasts = result,
      error: error => console.error(error)
    }
     
    );
  }

  title = 'assignmentclient';
}