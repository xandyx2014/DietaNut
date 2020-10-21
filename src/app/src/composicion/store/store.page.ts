import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
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
    public toastController: ToastController,
    public alertController: AlertController,
    private router: Router
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
      descripcion: new FormControl(''),
      desayuno: this.fb.array([]),
      merienda: this.fb.array([]),
      almuerzo: this.fb.array([]),
      te: this.fb.array([]),
      cena: this.fb.array([]),
      created_at:  new Date().toString(),
      req: this.fb.group({
        energia: 0,
        humedad: 0,
        proteina: 0,
        grasa: 0,
        hc: 0,
        fibra_cruda: 0,
        ceniza: 0,
        calcio: 0,
        fosforo: 0,
        hierro: 0,
        vit_a: 0,
        tiamina: 0,
        riboflavina: 0,
        niacina: 0,
        vit_c: 0,
        agm: 0,
        agp: 0,
        ags: 0,
        col: 0,
        potasio: 0,
        sodio: 0,
        zinc: 0,
        vit_b12: 0
      }),
    });
  }
  async changeControlValue(type, index) {
    const controls = this.controlForm(type).controls[index];
    const currentValue = controls.value;
    const nameValue = controls.value.nombre;
    this.composicionService.searchByName(nameValue).subscribe(resp => {
      Object.keys(resp).map( e => {
        if (e !== 'nombre') {
          currentValue.cantidad = Number((currentValue.cantidad as number).toString().replace(',', '.'));
          currentValue[e] =  ((resp[e] * Number( (currentValue.cantidad as number).toString()
          .replace(',', '.') )) / 100).toFixed(2);
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
        cantidad: ['' ],
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
  async store(el: HTMLElement) {
    if (this.myForm.invalid) {
      this.myForm.markAsDirty();
      this.myForm.markAllAsTouched();
      window.scroll(0, 0);
      el.scrollIntoView();
      const alertError = await this.alertController.create({
        header: 'Alerta',
        mode: 'md',
        subHeader: 'Falta un titulo a la dieta',
        buttons: ['Aceptar']
      });
      return await alertError.present();
    }
    const value = this.myForm.value;
    await this.storageLocal.guardarDatos({
      dato: value,
      referencia: 'composicion'
    });
    await this.router.navigate(['/home']);
    const alertSuccesStorage = await this.alertController.create({
      header: 'Exito',
      mode: 'md',
      subHeader: 'Se ha guardado tu dieta correctamente',
      message: 'Puedes revisarlo en tu lista de tus dietas',
      buttons: ['Aceptar']
    });
    return await alertSuccesStorage.present();
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
