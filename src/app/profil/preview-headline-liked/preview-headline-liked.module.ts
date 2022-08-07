import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviewHeadlineLikedPageRoutingModule } from './preview-headline-liked-routing.module';

import { PreviewHeadlineLikedPage } from './preview-headline-liked.page';
import {HomePageModule} from '../../home/home.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PreviewHeadlineLikedPageRoutingModule,
        HomePageModule
    ],
  declarations: [PreviewHeadlineLikedPage]
})
export class PreviewHeadlineLikedPageModule {}
