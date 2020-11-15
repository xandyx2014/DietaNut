import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntercambioPage } from './intercambio.page';

const routes: Routes = [
  {
    path: '',
    component: IntercambioPage
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then( m => m.StorePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntercambioPageRoutingModule {}
