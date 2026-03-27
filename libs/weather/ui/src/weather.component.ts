import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { WeatherStore } from '@app/weather/state';

@Component({
  selector: 'app-weather',
  standalone: true,
  template: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements OnInit {
  private readonly weatherStore: WeatherStore = inject(WeatherStore);

  readonly loading = this.weatherStore.loading;
  readonly error = this.weatherStore.error;
  readonly currentWeather = this.weatherStore.currentWeather;

  ngOnInit(): void {
    this.weatherStore.loadWeather();
  }
}
