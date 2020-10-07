import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntercambioPage } from './intercambio.page';

const routes: Routes = [
  {
    path: '',
    component: IntercambioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntercambioPageRoutingModule {}
