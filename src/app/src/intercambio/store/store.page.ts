import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  public myForm: FormGroup;
  public isRender = false;
  constructor(
    private fb: FormBuilder
  ) { }
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
        total: 0,
        totalCaloria: 0,
        totalGramos: 0
      })
    });
    this.setValueFromValue('carbohidrato');
    this.setValueFromValue('proteina');
    this.setValueFromValue('grasas');
    this.isRender = true;
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
    this.controlForm('calorias').get(`${type}Caloria`).patchValue(total.toFixed(3));
    this.controlForm('calorias').get(`${type}Gramo`).patchValue((total / 4).toFixed(3));
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
