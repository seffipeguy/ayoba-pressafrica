import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitialisationPageRoutingModule } from './initialisation-routing.module';

import { InitialisationPage } from './initialisation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InitialisationPageRoutingModule
  ],
  declarations: [InitialisationPage]
})
export class InitialisationPageModule {}
