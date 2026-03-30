import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WeatherComponent } from '../../../../../libs/weather/ui/src/weather.component';
import { BlockBuilderComponent } from '../../../../../libs/block-builder/src/block-builder/block-builder.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, HomeRoutingModule, WeatherComponent, BlockBuilderComponent],
  declarations: [HomeComponent],
})
export class HomeModule {}
