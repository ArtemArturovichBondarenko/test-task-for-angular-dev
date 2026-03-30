import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WeatherComponent } from '@app/weather/ui';
import { BlockBuilderComponent } from '@app/block-builder';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, HomeRoutingModule, WeatherComponent, BlockBuilderComponent],
  declarations: [HomeComponent],
})
export class HomeModule {}
