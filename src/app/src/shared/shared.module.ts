import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAlimentoComponent } from './search-alimento/search-alimento.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SubTotalComponent } from './sub-total/sub-total.component';
import { SubTotalPipe } from './pipe/sub-total.pipe';
import { AdecComponent } from './adec/adec.component';
import { ReqPipe } from './pipe/req.pipe';

@NgModule({
    declarations: [SearchAlimentoComponent, SubTotalComponent, SubTotalPipe, AdecComponent, ReqPipe],
    imports: [ CommonModule, AngularMultiSelectModule, IonicModule, FormsModule ],
    exports: [
        SearchAlimentoComponent, SubTotalComponent, SubTotalPipe, AdecComponent
    ],
    providers: [],
})
export class SharedModule {}
