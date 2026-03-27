import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export class WeatherApiService {
    http = inject(HttpClient);
    getCurrentWeather() {
        return this.http.get('https://api.open-meteo.com/v1/forecast?latitude=50.45&longitude=30.52&current_weather=true');
    }
    static ɵfac = function WeatherApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WeatherApiService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: WeatherApiService, factory: WeatherApiService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WeatherApiService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=weather-api.service.js.map