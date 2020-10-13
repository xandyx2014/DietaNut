import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComposicionPage } from './composicion.page';

const routes: Routes = [
  {
    path: '',
    component: ComposicionPage
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then(m => m.StorePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComposicionPageRoutingModule {}
