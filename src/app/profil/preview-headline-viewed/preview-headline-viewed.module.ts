import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewHeadlineViewedPageRoutingModule } from './preview-headline-viewed-routing.module';

import { PreviewHeadlineViewedPage } from './preview-headline-viewed.page';
import {HomePageModule} from "../../home/home.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PreviewHeadlineViewedPageRoutingModule,
        HomePageModule
    ],
  declarations: [PreviewHeadlineViewedPage]
})
export class PreviewHeadlineViewedPageModule {}
