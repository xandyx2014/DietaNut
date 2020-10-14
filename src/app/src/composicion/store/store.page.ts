import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ComposicionAlimentoService } from 'src/app/services/composicion-alimento.service';
import { StorageService } from 'src/app/services/storage.local.service';
import { SearchAlimentoComponent } from '../../shared/search-alimento/search-alimento.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  private unSubscribe = new Subscription();
  public myForm: FormGroup;
  constructor(
    private modalController: ModalController,
    private composicionService: ComposicionAlimentoService,
    private fb: FormBuilder,
    private storageLocal: StorageService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.makeForm();
  }
  ionViewWillEnter() {
  }
  makeForm() {
    return this.myForm = this.fb.group({
      uid: `${Date.now()}-${new Date().getMilliseconds()}-${new Date().getSeconds()}`,
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      desayuno: this.fb.array([]),
      merienda: this.fb.array([]),
      almuerzo: this.fb.array([]),
      te: this.fb.array([]),
      cena: this.fb.array([]),
      created_at:  new Date()
    });
  }
  changeControlValue(type, index) {
    const controls = this.controlForm(type).controls[index];
    const currentValue = controls.value;
    const nameValue = controls.value.nombre;
    this.composicionService.searchByName(nameValue).subscribe(resp => {
      Object.keys(resp).map( e => {
        if (e !== 'nombre') {
          currentValue[e] =  ((resp[e] * currentValue.cantidad) / 100).toFixed(2);
        }
      });
      controls.patchValue({...currentValue});
    });
  }
  async addFormControl(type: string) {
    const data = await this.presentModal();
    if (typeof data !== 'undefined') {
      this.controlForm(type).push(this.fb.group({
        ...data,
        cantidad: ['', [Validators.required, Validators.min(0)]],
      }));
    }
  }
  controlForm(type: string) {
    return this.myForm.get(type) as FormArray;
  }
  async removeControl(type: string, index: number) {
    if (this.controlForm(type).length !== 0) {
      this.controlForm(type).removeAt(index);
      const toast = await this.toastController.create({
        message: 'Item ha sido borrado',
        mode: 'md',
        duration: 2000
      });
      toast.present();
    }
  }

  ionViewWillLeave() {
    this.unSubscribe.unsubscribe();
  }
  store() {
    const value = this.myForm.value;
    console.log(value);
    this.storageLocal.guardarDatos({
      dato: value,
      referencia: 'composicion'
    });
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchAlimentoComponent,
      cssClass: 'my-custom-modal-css'
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    return data;
  }
}
