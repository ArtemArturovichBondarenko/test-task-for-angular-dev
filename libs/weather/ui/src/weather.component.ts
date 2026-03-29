import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { WeatherStore } from '@app/weather/state';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements OnInit {
  private readonly weatherStore: WeatherStore = inject(WeatherStore);

  readonly store = this.weatherStore;

  ngOnInit(): void {
    this.weatherStore.loadWeather();
  }
}
