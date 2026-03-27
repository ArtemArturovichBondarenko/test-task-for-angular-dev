import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class WeatherComponent implements OnInit {
    private readonly weatherStore;
    readonly loading: import("@angular/core").Signal<boolean>;
    readonly error: import("@angular/core").Signal<string | null>;
    readonly currentWeather: import("@angular/core").Signal<import("@app/weather/state").WeatherCurrent | null>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WeatherComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WeatherComponent, "app-weather", never, {}, {}, never, never, true, never>;
}
