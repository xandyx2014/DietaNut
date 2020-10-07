import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComposicionPageRoutingModule } from './composicion-routing.module';

import { ComposicionPage } from './composicion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComposicionPageRoutingModule
  ],
  declarations: [ComposicionPage]
})
export class ComposicionPageModule {}
