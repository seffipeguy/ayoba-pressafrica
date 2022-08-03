import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitialisationPage } from './initialisation.page';

const routes: Routes = [
  {
    path: '',
    component: InitialisationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitialisationPageRoutingModule {}
