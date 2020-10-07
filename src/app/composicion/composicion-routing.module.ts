import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComposicionPage } from './composicion.page';

const routes: Routes = [
  {
    path: '',
    component: ComposicionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComposicionPageRoutingModule {}
