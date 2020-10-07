import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntercambioPageRoutingModule } from './intercambio-routing.module';

import { IntercambioPage } from './intercambio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntercambioPageRoutingModule
  ],
  declarations: [IntercambioPage]
})
export class IntercambioPageModule {}
