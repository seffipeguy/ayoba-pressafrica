import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {TranslateModule} from '@ngx-translate/core';
import {ChooseCategoryComponent} from '../shared/choose-category/choose-category.component';
import {ChooseCountryComponent} from '../shared/choose-country/choose-country.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule
  ],
    declarations: [HomePage, ChooseCategoryComponent, ChooseCountryComponent]
})
export class HomePageModule {}
