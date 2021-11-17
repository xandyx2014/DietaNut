import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CalculoDieteticoPageRoutingModule } from "./calculo-dietetico-routing.module";
import { CalculoDieteticoPage } from "./calculo-dietetico.page";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CalculoDieteticoPageRoutingModule,
  ],
  declarations: [CalculoDieteticoPage],
})
export class CalculoDieteticoPageModule {}
