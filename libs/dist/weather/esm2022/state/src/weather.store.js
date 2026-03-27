import { computed, inject, Injectable, signal } from '@angular/core';
import { WeatherApiService } from './weather-api.service';
import * as i0 from "@angular/core";
export class WeatherStore {
    weatherApi = inject(WeatherApiService);
    _weather = signal(null, ...(ngDevMode ? [{ debugName: "_weather" }] : []));
    _loading = signal(false, ...(ngDevMode ? [{ debugName: "_loading" }] : []));
    _error = signal(null, ...(ngDevMode ? [{ debugName: "_error" }] : []));
    weather = this._weather.asReadonly();
    loading = this._loading.asReadonly();
    error = this._error.asReadonly();
    currentWeather = computed(() => this._weather()?.current_weather ?? null, ...(ngDevMode ? [{ debugName: "currentWeather" }] : []));
    hasData = computed(() => this.currentWeather() !== null, ...(ngDevMode ? [{ debugName: "hasData" }] : []));
    loadWeather() {
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
    static ɵfac = function WeatherStore_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WeatherStore)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WeatherStore, factory: WeatherStore.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WeatherStore, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=weather.store.js.map