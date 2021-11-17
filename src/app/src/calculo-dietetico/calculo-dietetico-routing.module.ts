import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CalculoDieteticoPage } from "./calculo-dietetico.page";

const routes: Routes = [
  {
    path: "",
    component: CalculoDieteticoPage,
  },
  {
    path: "store",
    loadChildren: () =>
      import("./store/store.module").then((m) => m.StorePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculoDieteticoPageRoutingModule {}
