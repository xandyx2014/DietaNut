import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { zipAll } from 'rxjs/operators';
import { IntercambioService } from 'src/app/services/intercambio.service';
import { RacionService } from 'src/app/services/racion.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  public myForm: FormGroup;
  public isRender = false;
  constructor(
    private fb: FormBuilder,
    private racionService: RacionService,
    private intercambioService: IntercambioService
  ) { }
  ionViewWillEnter() {
    this.myForm = this.fb.group({
      titulo: this.fb.control('', [Validators.required]),
      descripcion: '',
      calorias: this.fb.group({
        gastoEnergetico: this.fb.control(0, [Validators.required]),
        carbohidrato: 0,
        carbohidratoCaloria: this.fb.control({ value: 0, disabled: true}),
        carbohidratoGramo: this.fb.control({ value: 0, disabled: true }),
        proteina: 0,
        proteinaCaloria: this.fb.control({ value: 0, disabled: true }),
        proteinaGramo: this.fb.control({ value: 0, disabled: true }),
        grasas: 0,
        grasasCaloria: this.fb.control({ value: 0, disabled: true }),
        grasasGramo: this.fb.control({ value: 0, disabled: true }),
        total: this.fb.control({ value: 0, disabled: true }),
        totalCaloria: this.fb.control({ value: 0, disabled: true }),
        totalGramo: this.fb.control({ value: 0, disabled: true }),
      }),
      ingesta: this.fb.group({
        cereales: this.fb.group({
          racion: this.fb.control(0),
          energia: this.fb.control({ value: 0, disabled: true }),
          proteina: this.fb.control({ value: 0, disabled: true }),
          carbohidrato: this.fb.control({ value: 0, disabled: true }),
          lipido: this.fb.control({ value: 0, disabled: true }),
        }),
        verduras: this.fb.group({
          racion: this.fb.control(0),
          energia: this.fb.control({ value: 0, disabled: true }),
          proteina: this.fb.control({ value: 0, disabled: true }),
          carbohidrato: this.fb.control({ value: 0, disabled: true }),
          lipido: this.fb.control({ value: 0, disabled: true }),
        }),
        frutas: this.fb.group({
          racion: this.fb.control(0),
          energia: this.fb.control({ value: 0, disabled: true }),
          proteina: this.fb.control({ value: 0, disabled: true }),
          carbohidrato: this.fb.control({ value: 0, disabled: true }),
          lipido: this.fb.control({ value: 0, disabled: true }),
        }),
        leche: this.fb.group({
          racion: this.fb.control(0),
          energia: this.fb.control({ value: 0, disabled: true }),
          proteina: this.fb.control({ value: 0, disabled: true }),
          carbohidrato: this.fb.control({ value: 0, disabled: true }),
          lipido: this.fb.control({ value: 0, disabled: true }),
        }),
        carne: this.fb.group({
          racion: this.fb.control(0),
          energia: this.fb.control({ value: 0, disabled: true }),
          proteina: this.fb.control({ value: 0, disabled: true }),
          carbohidrato: this.fb.control({ value: 0, disabled: true }),
          lipido: this.fb.control({ value: 0, disabled: true }),
        }),
        azucarados: this.fb.group({
          racion: this.fb.control(0),
          energia: this.fb.control({ value: 0, disabled: true }),
          proteina: this.fb.control({ value: 0, disabled: true }),
          carbohidrato: this.fb.control({ value: 0, disabled: true }),
          lipido: this.fb.control({ value: 0, disabled: true }),
        }),
        grasas: this.fb.group({
          racion: this.fb.control(0),
          energia: this.fb.control({ value: 0, disabled: true }),
          proteina: this.fb.control({ value: 0, disabled: true }),
          carbohidrato: this.fb.control({ value: 0, disabled: true }),
          lipido: this.fb.control({ value: 0, disabled: true }),
        }),
      })
    });
    this.setValueFromValue('carbohidrato');
    this.setValueFromValue('proteina');
    this.setValueFromValue('grasas');
    this.getTotal();
    this.isRender = true;
  }
  searchByCaloria(gastoEnergetico: number) {
    this.racionService.searchByCaloria(gastoEnergetico).subscribe( resp => {
      this.controlForm('ingesta').get('cereales').get('racion').patchValue(resp.cereales, { emitEvent: false });
      this.controlForm('ingesta').get('verduras').get('racion').patchValue(resp.verduras, { emitEvent: false });
      this.controlForm('ingesta').get('frutas').get('racion').patchValue(resp.frutas, { emitEvent: false });
      this.controlForm('ingesta').get('leche').get('racion').patchValue(resp.leche, { emitEvent: false });
      this.controlForm('ingesta').get('carne').get('racion').patchValue(resp.carne, { emitEvent: false });
      this.controlForm('ingesta').get('azucarados').get('racion').patchValue(resp.azucarados, { emitEvent: false });
      this.controlForm('ingesta').get('grasas').get('racion').patchValue(resp.grasas, { emitEvent: false });
      this.addIntercambioValue('cereales');
      this.addIntercambioValue('verduras');
      this.addIntercambioValue('frutas');
      this.addIntercambioValue('leche');
      this.addIntercambioValue('carne');
      this.addIntercambioValue('azucarados');
      this.addIntercambioValue('grasas');
    });
  }
  addIntercambioValue(type) {
    this.intercambioService.searchByGrupo(type).subscribe( e => {
      this.controlForm('ingesta')
      .get(type)
      .get('energia').patchValue(e.energia, { emitEvent: false });
      this.controlForm('ingesta')
      .get(type)
      .get('proteina').patchValue(e.proteina, { emitEvent: false });
      this.controlForm('ingesta')
      .get(type)
      .get('carbohidrato').patchValue(e.carbohidrato, { emitEvent: false });
      this.controlForm('ingesta')
      .get(type)
      .get('lipido').patchValue(e.lipido, { emitEvent: false });
    });
  }
  getTotal() {
    this.controlForm('calorias').valueChanges.subscribe(e => {
      this.searchByCaloria(e.gastoEnergetico);
      const total = Number(e.carbohidrato) + Number(e.proteina) + Number(e.grasas);
      const totalCaloria = this.getTotalFromType('Caloria').toFixed(2);
      const totalGramo = this.getTotalFromType('Gramo').toFixed(2);
      this.controlForm('calorias').get(`total`).patchValue(total, { emitEvent: false });
      this.controlForm('calorias').get(`totalCaloria`).patchValue(totalCaloria, { emitEvent: false });
      this.controlForm('calorias').get(`totalGramo`).patchValue(totalGramo, { emitEvent: false });
    });
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
  ngOnInit() {
  }
  store() {
    console.log(this.myForm.value);
  }

}
