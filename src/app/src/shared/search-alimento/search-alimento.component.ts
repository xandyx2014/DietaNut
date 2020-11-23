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
                                  classes: 'searchAlimento',
                                  searchPlaceholderText: 'Buscar',
                                  maxHeight: 100
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
        this.itemSelect = item;
    }
    OnItemDeSelect(item: any){
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
    }
    onDeSelectAll(items: any){
    }
    selectItem() {
        this.modalCtrl.dismiss(this.itemSelect);
    }
}
