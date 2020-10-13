import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorePageRoutingModule } from './store-routing.module';
import { StorePage } from './store.page';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    StorePageRoutingModule,
    SharedModule
  ],
  declarations: [StorePage]
})
export class StorePageModule {}
