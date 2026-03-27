import { Observable } from 'rxjs';
import { WeatherResponse } from './weather.models';
import * as i0 from "@angular/core";
export declare class WeatherApiService {
    private readonly http;
    getCurrentWeather(): Observable<WeatherResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<WeatherApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WeatherApiService>;
}
