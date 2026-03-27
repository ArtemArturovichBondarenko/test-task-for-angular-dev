import { computed, inject, Injectable, signal } from '@angular/core';

import { WeatherApiService } from './weather-api.service';
import { WeatherResponse } from './weather.models';

@Injectable({
  providedIn: 'root',
})
export class WeatherStore {
  private readonly weatherApi = inject(WeatherApiService);

  private readonly _weather = signal<WeatherResponse | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly weather = this._weather.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly currentWeather = computed(() => this._weather()?.current_weather ?? null);
  readonly hasData = computed(() => this.currentWeather() !== null);

  loadWeather(): void {
    this._loading.set(true);
    this._error.set(null);

    this.weatherApi.getCurrentWeather().subscribe({
      next: (response) => {
        this._weather.set(response);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Failed to load weather data');
        this._loading.set(false);
      },
    });
  }
}
