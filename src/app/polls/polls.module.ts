import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PollsPageRoutingModule } from './polls-routing.module';

import { PollsPage } from './polls.page';
import {MiniaturePollComponent} from '../shared/miniature-poll/miniature-poll.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PollsPageRoutingModule
  ],
  declarations: [PollsPage, MiniaturePollComponent]
})
export class PollsPageModule {}
