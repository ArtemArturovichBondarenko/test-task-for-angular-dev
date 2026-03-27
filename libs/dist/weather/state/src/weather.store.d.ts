import { WeatherResponse } from './weather.models';
import * as i0 from "@angular/core";
export declare class WeatherStore {
    private readonly weatherApi;
    private readonly _weather;
    private readonly _loading;
    private readonly _error;
    readonly weather: import("@angular/core").Signal<WeatherResponse | null>;
    readonly loading: import("@angular/core").Signal<boolean>;
    readonly error: import("@angular/core").Signal<string | null>;
    readonly currentWeather: import("@angular/core").Signal<import("@app/weather/state").WeatherCurrent | null>;
    readonly hasData: import("@angular/core").Signal<boolean>;
    loadWeather(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WeatherStore, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<WeatherStore>;
}
