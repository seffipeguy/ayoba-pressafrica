import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import {MiniatureHeadlineComponent} from '../shared/miniature-headline/miniature-headline.component';
import {PrintRecentHeadlineComponent} from '../shared/print-recent-headline/print-recent-headline.component';
import {ResultSearchHeadlineComponent} from "../shared/result-search-headline/result-search-headline.component";
import {PrintAllCoverageComponent} from "../shared/print-all-coverage/print-all-coverage.component";
import {PrintXCoverageComponent} from "../shared/print-x-coverage/print-x-coverage.component";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,
        TranslateModule
    ],
    exports: [
        MiniatureHeadlineComponent
    ],
    declarations: [Tab1Page, MiniatureHeadlineComponent, PrintRecentHeadlineComponent, ResultSearchHeadlineComponent, PrintAllCoverageComponent, PrintXCoverageComponent]
})
export class Tab1PageModule {}
