import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IntercambioService } from 'src/app/services/intercambio.service';
import { RacionService } from 'src/app/services/racion.service';
import { StorageService } from 'src/app/services/storage.local.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  public myForm: FormGroup;
  public isRender = false;
  private ingesta = ['cereales', 'verduras', 'frutas', 'leche', 'carne', 'azucarados', 'grasas'];
  private valueUpdate: any = {};
  private edit = false;
  constructor(
    private fb: FormBuilder,
    private racionService: RacionService,
    private storageLocal: StorageService,
    private intercambioService: IntercambioService,
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public alertController: AlertController,
  ) { }
  ngOnInit() { }
  ionViewWillEnter() {
    this.getQueryParams();
  }
  private getQueryParams() {
    this.activatedRouter.queryParams.subscribe(async resp => {
      if (Object.keys(resp).length) {
        this.valueUpdate = await this.storageLocal.buscarPorUid('intercambio', resp.uid);
        this.edit = resp.edit;
      }
      this.makeForm();
    });
  }
  makeForm() {
    this.myForm = this.fb.group({
      uid: this.uuid(),
      titulo: this.fb.control('', [Validators.required]),
      descripcion: '',
      created_at: new Date().toString(),
      calorias: this.fb.group({
        gastoEnergetico: 0,
        carbohidrato: 0,
        carbohidratoCaloria: 0,
        carbohidratoGramo: 0,
        proteina: 0,
        proteinaCaloria: 0,
        proteinaGramo: 0,
        grasas: 0,
        grasasCaloria: 0,
        grasasGramo: 0,
        total: 0,
        totalCaloria: 0,
        totalGramo: 0,
      }),
      distribucion: this.fb.group({
        cereales: this.createDistribucionControl(),
        verduras: this.createDistribucionControl(),
        frutas: this.createDistribucionControl(),
        leche: this.createDistribucionControl(),
        carne: this.createDistribucionControl(),
        azucarados: this.createDistribucionControl(),
        grasas: this.createDistribucionControl(),
      }),
      ingesta: this.fb.group({
        cereales: this.createIngestaControl(),
        verduras: this.createIngestaControl(),
        frutas: this.createIngestaControl(),
        leche: this.createIngestaControl(),
        carne: this.createIngestaControl(),
        azucarados: this.createIngestaControl(),
        grasas: this.createIngestaControl(),
        totalRacion: 0,
        totalEnergia: 0,
        totalProteina: 0,
        totalLipido: 0,
        totalCarbohidrato: 0,
        requerimiento: this.fb.group({
          racion: 0,
          energia: 0,
          proteina: 0,
          lipido: 0,
          carbohidrato: 0,
        }),
        adecuacion: this.fb.group({
          racion: 0,
          energia: 0,
          proteina: 0,
          lipido: 0,
          carbohidrato: 0,
        }),
      })
    });
    this.setValueFromValue('carbohidrato');
    this.setValueFromValue('proteina');
    this.setValueFromValue('grasas');
    this.setValueIngestaGroupControl();
    this.searchGroupByCaloria();
    this.getTotal();
    this.getTotalAdecuacion();
    this.isRender = true;
    if (Object.keys(this.valueUpdate).length) {
      this.updateForm();
    }
  }
  updateForm() {
    this.myForm.patchValue({
      uid: this.valueUpdate.uid,
      titulo: this.valueUpdate.titulo,
      descripcion: this.valueUpdate.descripcion,
    }, { emitEvent: false });
    this.controlForm('calorias').patchValue({
      gastoEnergetico: this.valueUpdate.calorias.gastoEnergetico,
      carbohidrato: this.valueUpdate.calorias.carbohidrato,
      carbohidratoCaloria: this.valueUpdate.calorias.carbohidratoCaloria,
      carbohidratoGramo: this.valueUpdate.calorias.carbohidratoGramo,
      proteina: this.valueUpdate.calorias.proteina,
      proteinaCaloria: this.valueUpdate.calorias.proteinaCaloria,
      proteinaGramo: this.valueUpdate.calorias.proteinaGramo,
      grasas: this.valueUpdate.calorias.grasas,
      grasasCaloria: this.valueUpdate.calorias.grasasCaloria,
      grasasGramo: this.valueUpdate.calorias.grasasGramo,
      total: this.valueUpdate.calorias.total,
      totalCaloria: this.valueUpdate.calorias.totalCaloria,
      totalGramo: this.valueUpdate.calorias.totalGramo,
    }, { emitEvent: false });
    this.ingesta.forEach(ingesta => {
      this.controlForm('distribucion').get(ingesta).patchValue({
        racion: this.valueUpdate.distribucion[ingesta].racion,
        desayuno: this.valueUpdate.distribucion[ingesta].desayuno,
        merienda: this.valueUpdate.distribucion[ingesta].merienda,
        almuerzo: this.valueUpdate.distribucion[ingesta].almuerzo,
        meriendaTwo: this.valueUpdate.distribucion[ingesta].meriendaTwo,
        cena: this.valueUpdate.distribucion[ingesta].cena
      }, { emitEvent: false });
      this.controlForm('ingesta').get(ingesta).patchValue({
        racion: this.valueUpdate.ingesta[ingesta].racion,
        energia: this.valueUpdate.ingesta[ingesta].energia,
        proteina: this.valueUpdate.ingesta[ingesta].proteina,
        carbohidrato: this.valueUpdate.ingesta[ingesta].carbohidrato,
        lipido: this.valueUpdate.ingesta[ingesta].lipido,
        grasas: this.valueUpdate.ingesta[ingesta].grasas
      }, { emitEvent: false });
    });
    this.controlForm('ingesta').patchValue({
      totalRacion: this.valueUpdate.ingesta.totalRacion,
      totalEnergia: this.valueUpdate.ingesta.totalEnergia,
      totalProteina: this.valueUpdate.ingesta.totalProteina,
      totalLipido: this.valueUpdate.ingesta.totalLipido,
      totalCarbohidrato: this.valueUpdate.ingesta.totalCarbohidrato,
    }, { emitEvent: false });
    this.controlForm('ingesta').get('requerimiento').patchValue({
      racion: this.valueUpdate.ingesta.requerimiento.racion,
      energia: this.valueUpdate.ingesta.requerimiento.energia,
      proteina: this.valueUpdate.ingesta.requerimiento.proteina,
      lipido: this.valueUpdate.ingesta.requerimiento.lipido,
      carbohidrato: this.valueUpdate.ingesta.requerimiento.carbohidrato,
    }, { emitEvent: false });
    this.controlForm('ingesta').get('adecuacion').patchValue({
      racion: this.valueUpdate.ingesta.adecuacion.racion,
      energia: this.valueUpdate.ingesta.adecuacion.energia,
      proteina: this.valueUpdate.ingesta.adecuacion.proteina,
      lipido: this.valueUpdate.ingesta.adecuacion.lipido,
      carbohidrato: this.valueUpdate.ingesta.adecuacion.carbohidrato,
    }, { emitEvent: false });
  }
  getTotalAdecuacion() {
    this.controlForm('ingesta').get('requerimiento').valueChanges.subscribe(e => {
      this.setTotalAdecuacion();
    });
  }
  setTotalAdecuacion() {
    const totalRacion = this.controlForm('ingesta').get('totalRacion').value;
    const totalEnergia = this.controlForm('ingesta').get('totalEnergia').value;
    const totalProteina = this.controlForm('ingesta').get('totalProteina').value;
    const totalLipido = this.controlForm('ingesta').get('totalLipido').value;
    const totalCarbohidrato = this.controlForm('ingesta').get('totalCarbohidrato').value;
    console.log(this.controlForm('ingesta').get('requerimiento').value.energia);
    this.controlForm('ingesta').get('adecuacion').patchValue({
      racion: ((  totalRacion / this.controlForm('ingesta').get('requerimiento').value.racion  ) * 100).toFixed(2),
      energia: (( totalEnergia / this.controlForm('ingesta').get('requerimiento').value.energia ) * 100).toFixed(2),
      proteina: (( totalProteina / this.controlForm('ingesta').get('requerimiento').value.proteina ) * 100).toFixed(2),
      lipido: (( totalLipido / this.controlForm('ingesta').get('requerimiento').value.lipido ) * 100).toFixed(2),
      carbohidrato: (( totalCarbohidrato / this.controlForm('ingesta').get('requerimiento').value.carbohidrato ) * 100).toFixed(2),
    }, { emitEvent: false });
  }
  searchGroupByCaloria() {
    this.controlForm('calorias').get('gastoEnergetico').valueChanges.subscribe(e => {
      this.searchByCaloria(e);
    });
  }
  getTotalIngesta() {
    let totalRacion = 0;
    let totalEnergia = 0;
    let totalProteina = 0;
    let totalLipido = 0;
    let totalCarbohidrato = 0;
    this.ingesta.forEach(ingesta => {
      totalRacion = Number(totalRacion) + Number(this.controlForm('ingesta').get(ingesta).value.racion);
      totalEnergia = Number(totalEnergia) + Number(this.controlForm('ingesta').get(ingesta).value.energia);
      totalProteina = Number(totalProteina) + Number(this.controlForm('ingesta').get(ingesta).value.proteina);
      totalLipido = Number(totalLipido) + Number(this.controlForm('ingesta').get(ingesta).value.lipido);
      totalCarbohidrato = Number(totalCarbohidrato) + Number(this.controlForm('ingesta').get(ingesta).value.carbohidrato);
    });
    this.controlForm('ingesta').patchValue({
      totalRacion,
      totalEnergia,
      totalProteina,
      totalLipido,
      totalCarbohidrato,
    }, { emitEvent: false });
    this.setTotalAdecuacion();
  }
  setValueIngestaGroupControl() {
    this.ingesta.forEach(type => {
      this.controlForm('ingesta').get(type).valueChanges.subscribe(e => {
        const racion = e.racion;
        this.controlForm('distribucion').get(type).patchValue({
          racion
        }, { emitEvent: false });
        console.log(racion, type);
        this.intercambioService.searchByGrupo(type).subscribe(grupo => {
          const value = {
            racion,
            energia: (Number(racion) * Number(grupo.energia)).toFixed(2),
            proteina: (Number(racion) * Number(grupo.proteina)).toFixed(2),
            carbohidrato: (Number(racion) * Number(grupo.carbohidrato)).toFixed(2),
            lipido: (Number(racion) * Number(grupo.lipido)).toFixed(2),
          };
          this.controlForm('ingesta').get(type).patchValue(value, { emitEvent: false });
          this.getTotalIngesta();
        });
      });
    });
  }
  createIngestaControl(): FormGroup {
    return this.fb.group({
      racion: 0,
      energia: 0,
      proteina: 0,
      carbohidrato: 0,
      lipido: 0,
      grasas: 0
    });
  }
  createDistribucionControl(): FormGroup {
    return this.fb.group({
      racion: 0,
      desayuno: 0,
      merienda: 0,
      almuerzo: 0,
      meriendaTwo: 0,
      cena: 0
    });
  }
  searchByCaloria(gastoEnergetico: number) {
    this.racionService.searchByCaloria(gastoEnergetico).subscribe(resp => {
      this.ingesta.forEach(e => {
        // cambia la racion del grupo
        this.controlForm('ingesta').get(e).get('racion').patchValue(resp[e], { emitEvent: false });
        /* console.log( this.controlForm('distribucion').get(e)); */
        this.controlForm('distribucion').get(e).get('racion').patchValue(resp[e], { emitEvent: false });
        this.addIntercambioValue(e, resp[e]);
      });
    });
  }
  addIntercambioValue(type, racion) {
    this.intercambioService.searchByGrupo(type).subscribe(e => {
      // Se agregado la ingesta de alimentos para cereales, verduras, frutas
      this.controlForm('ingesta').get(type).patchValue({
        racion,
        energia: (Number(racion) * Number(e.energia)).toFixed(2),
        proteina: (Number(racion) * Number(e.proteina)).toFixed(2),
        carbohidrato: (Number(racion) * Number(e.carbohidrato)).toFixed(2),
        lipido: (Number(racion) * Number(e.lipido)).toFixed(2),
      }, { emitEvent: false });
      this.getTotalIngesta();
    });
  }
  getTotal() {
    this.controlForm('calorias').valueChanges.subscribe(e => {
      const total = (Number(e.carbohidrato) + Number(e.proteina) + Number(e.grasas)).toFixed(2);
      const totalCaloria = this.getTotalFromType('Caloria').toFixed(2);
      const totalGramo = this.getTotalFromType('Gramo').toFixed(2);
      this.controlForm('calorias').get(`total`).patchValue(total, { emitEvent: false });
      this.controlForm('calorias').get(`totalCaloria`).patchValue(totalCaloria, { emitEvent: false });
      this.controlForm('calorias').get(`totalGramo`).patchValue(totalGramo, { emitEvent: false });
      const carbohidrato = this.controlForm('calorias').get(`carbohidratoGramo`).value;
      const proteina = this.controlForm('calorias').get(`proteinaGramo`).value;
      const grasas = this.controlForm('calorias').get(`grasasGramo`).value;
      this.controlForm('ingesta').get('requerimiento').patchValue({
        energia: totalCaloria,
        proteina,
        lipido: grasas,
        carbohidrato
      }, { emitEvent: false });
      this.setTotalAdecuacion();
    });
    this.getTotalIngesta();
  }
  getTotalFromType(type) {
    const carbohidratoCaloria = this.controlForm('calorias').get(`carbohidrato${type}`).value;
    const proteinaCaloria = this.controlForm('calorias').get(`proteina${type}`).value;
    const grasasCaloria = this.controlForm('calorias').get(`grasas${type}`).value;
    return Number(carbohidratoCaloria) + Number(proteinaCaloria) + Number(grasasCaloria);
  }
  setValueFromValue(type: string) {
    this.controlForm('calorias').get('gastoEnergetico').valueChanges.subscribe(e => {
      this.changeValueFromControl(type);
    });
    this.controlForm('calorias').get(type).valueChanges.subscribe(e => {
      this.changeValueFromControl(type);
    });
  }
  changeValueFromControl(type) {
    const gastoEnergetico = this.controlForm('calorias').get('gastoEnergetico').value;
    const value = this.controlForm('calorias').get(type).value;
    const total = ((value * gastoEnergetico) / 100);
    let totalGramo = (total / 4).toFixed(2);
    if (type === 'grasas') {
      totalGramo = (total / 9).toFixed(2);
    }
    this.controlForm('calorias').get(`${type}Caloria`).patchValue(total.toFixed(2), { emitEvent: false });
    this.controlForm('calorias').get(`${type}Gramo`).patchValue(totalGramo, { emitEvent: false });
  }
  controlForm(type: string) {
    return this.myForm.get(type) as FormGroup;
  }
  private uuid() {
    return `${Date.now()}-${new Date().getMilliseconds()}-${new Date().getSeconds()}`;
  }
  async store(el) {
    const resport = await this.alertMessage(el);
    if (resport) {
      return;
    }
    if (Object.keys(this.valueUpdate).length) {
      return await this.updateValue();
    }
    await this.storeValue();
  }
  async updateValue() {
    const value = this.myForm.value;
    console.log('update');
    await this.storageLocal.actualizarDato(value.uid, this.myForm.value, 'intercambio');
    this.router.navigate(['/home']);
    const alertSuccesStorage = await this.alertController.create({
      header: 'Exito',
      mode: 'md',
      subHeader: 'Se ha actualizado tu dieta correctamente',
      message: 'Puedes revisarlo en tu lista de tus dietas',
      buttons: ['Aceptar']
    });
    return await alertSuccesStorage.present();
  }
  async storeValue() {
    const value = this.myForm.value;
    console.log('store');
    await this.storageLocal.guardarDatos({
      dato: value,
      referencia: 'intercambio'
    });
    this.router.navigate(['/home']);
    const alertSuccesStorage = await this.alertController.create({
      header: 'Exito',
      mode: 'md',
      subHeader: 'Se ha guardado tu dieta correctamente',
      message: 'Puedes revisarlo en tu lista de tus dietas',
      buttons: ['Aceptar']
    });
    return await alertSuccesStorage.present();
  }
  private async alertMessage(el) {
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
      await alertError.present();
      return true;
    }
    return false;
  }

}
