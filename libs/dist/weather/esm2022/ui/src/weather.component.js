import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WeatherStore } from '@app/weather/state';
import * as i0 from "@angular/core";
function WeatherComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p");
    i0.ɵɵtext(1, "Loading weather...");
    i0.ɵɵdomElementEnd();
} }
function WeatherComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.store.error());
} }
function WeatherComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "h3");
    i0.ɵɵtext(1, "Current weather");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(2, "p");
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(10, "p");
    i0.ɵɵtext(11);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const current_r2 = ctx;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Temperature: ", current_r2.temperature, "\u00B0C");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Wind speed: ", current_r2.windspeed, " km/h");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Wind direction: ", current_r2.winddirection, "\u00B0");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Weather code: ", current_r2.weathercode);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Time: ", current_r2.time);
} }
function WeatherComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p");
    i0.ɵɵtext(1, "No weather data yet.");
    i0.ɵɵdomElementEnd();
} }
export class WeatherComponent {
    weatherStore = inject(WeatherStore);
    store = this.weatherStore;
    ngOnInit() {
        this.weatherStore.loadWeather();
    }
    static ɵfac = function WeatherComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WeatherComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WeatherComponent, selectors: [["app-weather"]], decls: 5, vars: 1, consts: [[1, "weather-card"]], template: function WeatherComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0);
            i0.ɵɵconditionalCreate(1, WeatherComponent_Conditional_1_Template, 2, 0, "p")(2, WeatherComponent_Conditional_2_Template, 2, 1, "p")(3, WeatherComponent_Conditional_3_Template, 12, 5)(4, WeatherComponent_Conditional_4_Template, 2, 0, "p");
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.store.loading() ? 1 : ctx.store.error() ? 2 : (tmp_0_0 = ctx.store.currentWeather()) ? 3 : 4, tmp_0_0);
        } }, styles: [".weather-card[_ngcontent-%COMP%]{padding:16px;border:1px solid #dcdcdc;border-radius:12px;background:#fff}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WeatherComponent, [{
        type: Component,
        args: [{ selector: 'app-weather', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"weather-card\">\n  @if (store.loading()) {\n    <p>Loading weather...</p>\n  } @else if (store.error()) {\n    <p>{{ store.error() }}</p>\n  } @else if (store.currentWeather(); as current) {\n    <h3>Current weather</h3>\n    <p>Temperature: {{ current.temperature }}\u00B0C</p>\n    <p>Wind speed: {{ current.windspeed }} km/h</p>\n    <p>Wind direction: {{ current.winddirection }}\u00B0</p>\n    <p>Weather code: {{ current.weathercode }}</p>\n    <p>Time: {{ current.time }}</p>\n  } @else {\n    <p>No weather data yet.</p>\n  }\n</section>\n", styles: [".weather-card{padding:16px;border:1px solid #dcdcdc;border-radius:12px;background:#fff}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(WeatherComponent, { className: "WeatherComponent", filePath: "src/weather.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=weather.component.js.map