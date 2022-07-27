import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';
import {RedirectGuardService} from './services/redirect-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'apercu-news/:id',
    loadChildren: () => import('./apercu-news/apercu-news.module').then( m => m.ApercuNewsPageModule)
  },
  {
    path: 'initialisation',
    canActivate: [RedirectGuardService],
    loadChildren: () => import('./initialisation/initialisation.module').then( m => m.InitialisationPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: false,
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
