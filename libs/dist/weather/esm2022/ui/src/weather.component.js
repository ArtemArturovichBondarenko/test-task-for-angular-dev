import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WeatherStore } from '@app/weather/state';
import * as i0 from "@angular/core";
export class WeatherComponent {
    weatherStore = inject(WeatherStore);
    loading = this.weatherStore.loading;
    error = this.weatherStore.error;
    currentWeather = this.weatherStore.currentWeather;
    ngOnInit() {
        this.weatherStore.loadWeather();
    }
    static ɵfac = function WeatherComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WeatherComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WeatherComponent, selectors: [["app-weather"]], decls: 1, vars: 0, template: function WeatherComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtext(0, "./weather.component.html");
        } }, styles: [".weather-card[_ngcontent-%COMP%]{padding:16px;border:1px solid #dcdcdc;border-radius:12px;background:#fff}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WeatherComponent, [{
        type: Component,
        args: [{ selector: 'app-weather', standalone: true, template: './weather.component.html', changeDetection: ChangeDetectionStrategy.OnPush, styles: [".weather-card{padding:16px;border:1px solid #dcdcdc;border-radius:12px;background:#fff}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(WeatherComponent, { className: "WeatherComponent", filePath: "src/weather.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=weather.component.js.map