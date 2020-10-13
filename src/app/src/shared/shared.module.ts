import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAlimentoComponent } from './search-alimento/search-alimento.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [SearchAlimentoComponent],
    imports: [ CommonModule, AngularMultiSelectModule, IonicModule, FormsModule ],
    exports: [
        SearchAlimentoComponent,
    ],
    providers: [],
})
export class SharedModule {}
