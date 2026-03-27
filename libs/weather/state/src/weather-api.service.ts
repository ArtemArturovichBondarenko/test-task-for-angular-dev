import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherResponse } from './weather.models';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private readonly http = inject(HttpClient);

  getCurrentWeather(): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(
      'https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&current_weather=true',
    );
  }
}
