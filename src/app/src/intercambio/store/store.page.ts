import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  private ingesta = ['cereales', 'verduras', 'frutas', 'leche', 'carne', 'azucarados', 'grasas'];
  constructor(
    private fb: FormBuilder,
    private racionService: RacionService,
    private intercambioService: IntercambioService
  ) { }
  ngOnInit() { }
  ionViewWillEnter() {
    this.myForm = this.fb.group({
      titulo: this.fb.control('', [Validators.required]),
      descripcion: '',
      calorias: this.fb.group({
        gastoEnergetico: this.fb.control(0, [Validators.required]),
        carbohidrato: 0,
        carbohidratoCaloria: this.fb.control({ value: 0, disabled: true }),
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
    this.controlForm('ingesta').get('adecuacion').patchValue({
      racion:  ((this.controlForm('ingesta').get('requerimiento').value.racion / totalRacion) * 100 ).toFixed(2),
      energia: ((this.controlForm('ingesta').get('requerimiento').value.energia / totalEnergia) * 100 ).toFixed(2),
      proteina: ((this.controlForm('ingesta').get('requerimiento').value.proteina / totalProteina) * 100 ).toFixed(2),
      lipido: ((this.controlForm('ingesta').get('requerimiento').value.lipido / totalLipido) * 100 ).toFixed(2),
      carbohidrato: ((this.controlForm('ingesta').get('requerimiento').value.carbohidrato / totalCarbohidrato) * 100 ).toFixed(2),
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
      console.log(totalEnergia);
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
        this.intercambioService.searchByGrupo(type).subscribe(grupo => {
          const value = {
            racion,
            energia: Number(racion) * Number(grupo.energia),
            proteina: Number(racion) * Number(grupo.proteina),
            carbohidrato: Number(racion) * Number(grupo.carbohidrato),
            lipido: Number(racion) * Number(grupo.lipido),
          };
          console.log(value);
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
    });
  }
  searchByCaloria(gastoEnergetico: number) {
    this.racionService.searchByCaloria(gastoEnergetico).subscribe(resp => {
      this.ingesta.forEach(e => {
        this.controlForm('ingesta').get(e).get('racion').patchValue(resp[e], { emitEvent: false });
        this.addIntercambioValue(e, resp[e]);
      });
    });
  }
  addIntercambioValue(type, racion) {
    this.intercambioService.searchByGrupo(type).subscribe(e => {
      this.controlForm('ingesta').get(type).patchValue({
        racion,
        energia: Number(racion) * Number(e.energia),
        proteina: Number(racion) * Number(e.proteina),
        carbohidrato: Number(racion) * Number(e.carbohidrato),
        lipido: Number(racion) * Number(e.lipido),
      }, { emitEvent: false });
    });
  }
  getTotal() {
    this.controlForm('calorias').valueChanges.subscribe(e => {
      const total = Number(e.carbohidrato) + Number(e.proteina) + Number(e.grasas);
      const totalCaloria = this.getTotalFromType('Caloria').toFixed(2);
      const totalGramo = this.getTotalFromType('Gramo').toFixed(2);
      this.controlForm('calorias').get(`total`).patchValue(total, { emitEvent: false });
      this.controlForm('calorias').get(`totalCaloria`).patchValue(totalCaloria, { emitEvent: false });
      this.controlForm('calorias').get(`totalGramo`).patchValue(totalGramo, { emitEvent: false });
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

  store() {
    console.log(this.myForm.value);
  }

}
