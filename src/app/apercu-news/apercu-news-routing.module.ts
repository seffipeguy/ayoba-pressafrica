import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApercuNewsPage } from './apercu-news.page';

const routes: Routes = [
  {
    path: '',
    component: ApercuNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApercuNewsPageRoutingModule {}
