import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DropdownSettings } from 'angular2-multiselect-dropdown/lib/multiselect.interface';

import { ComposicionAlimentoService } from 'src/app/services/composicion-alimento.service';

@Component({
  selector: 'app-search-alimento',
  templateUrl: './search-alimento.component.html',
  styleUrls: ['./search-alimento.component.scss'],
})
export class SearchAlimentoComponent implements OnInit {
    dropdownList = [];
    selectedItems = [];
    itemSelect: object;
    dropdownSettings = {};
    loading = false;
    showLoading = true;
    constructor(private modalCtrl: ModalController,
                private composicionAlimnetoService: ComposicionAlimentoService) {}
    ngOnInit(){
        this.dropdownList = [];
        this.selectedItems = [];
        this.dropdownSettings = {
                                  singleSelection: false,
                                  text: 'Seleciona los alimentos',
                                  selectAllText: 'Seleciona todos',
                                  unSelectAllText: 'Deselecionar todos',
                                  enableSearchFilter: true,
                                  enableFilterSelectAll: false,
                                  limitSelection: 20,
                                  lazyLoading: true,
                                  labelKey: 'nombre',
                                  classes: 'myclass custom-class',
                                  searchPlaceholderText: 'Buscar'
                                };
        this.loadDataFromJson();
    }
    loadDataFromJson() {
        this.composicionAlimnetoService.getAll().subscribe((resp: any) => {
            this.dropdownList = resp;
            this.loading = false;
            this.showLoading = false;
        });
    }
    closeMultiselect() {
        console.log('Evento enter');
    }
    onItemSelect(item: any){
        console.log('On item selected', item);
        this.itemSelect = item;
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any){
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }
    selectItem() {
        this.modalCtrl.dismiss(this.itemSelect);
    }
}
