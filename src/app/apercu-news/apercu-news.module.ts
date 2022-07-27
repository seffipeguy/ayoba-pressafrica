import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApercuNewsPageRoutingModule } from './apercu-news-routing.module';

import { ApercuNewsPage } from './apercu-news.page';
import {MiniatureCommentComponent} from "../shared/miniature-comment/miniature-comment.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ApercuNewsPageRoutingModule,
        TranslateModule
    ],
  declarations: [ApercuNewsPage, MiniatureCommentComponent]
})
export class ApercuNewsPageModule {}
