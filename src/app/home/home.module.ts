import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {ChooseCountryComponent} from "../shared/choose-country/choose-country.component";
import {ChooseCategoryComponent} from "../shared/choose-category/choose-category.component";
import {TranslateModule} from "@ngx-translate/core";
import {PrintRecentHeadlineComponent} from "../shared/print-recent-headline/print-recent-headline.component";
import {ResultSearchHeadlineComponent} from "../shared/result-search-headline/result-search-headline.component";
import {PrintAllCoverageComponent} from "../shared/print-all-coverage/print-all-coverage.component";
import {PrintXCoverageComponent} from "../shared/print-x-coverage/print-x-coverage.component";
import {MiniatureHeadlineComponent} from "../shared/miniature-headline/miniature-headline.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule
  ],
  exports: [
    ChooseCategoryComponent,
    MiniatureHeadlineComponent
  ],
  declarations: [HomePage, ChooseCountryComponent, ChooseCategoryComponent, PrintRecentHeadlineComponent, ResultSearchHeadlineComponent, PrintAllCoverageComponent, PrintXCoverageComponent, MiniatureHeadlineComponent]
})
export class HomePageModule {}
