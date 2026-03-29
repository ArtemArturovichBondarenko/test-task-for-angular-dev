import { OnInit } from '@angular/core';
import { WeatherStore } from '@app/weather/state';
import * as i0 from "@angular/core";
export declare class WeatherComponent implements OnInit {
    private readonly weatherStore;
    readonly store: WeatherStore;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<WeatherComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WeatherComponent, "app-weather", never, {}, {}, never, never, true, never>;
}
