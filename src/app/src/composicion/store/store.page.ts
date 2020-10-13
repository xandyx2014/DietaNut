import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ComposicionAlimentoService } from 'src/app/services/composicion-alimento.service';
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
  ) { }

  ngOnInit() {
    this.makeForm();
  }
  ionViewWillEnter() {
    console.log('Entre');
    this.unSubscribe.add(this.composicionService.getAll().subscribe(resp => {
      console.log(resp);
    })
    );
  }
  makeForm() {
    this.myForm = this.fb.group({
      desayuno: this.fb.array([]),
    });
  }
  addFormControl(type: string) {
    this.controlForm(type).push(this.fb.group({
      nombre: '',
      edad: ''
    }));
  }
  controlForm(type: string) {
    return this.myForm.get(type) as FormArray;
  }

  ionViewWillLeave() {
    this.unSubscribe.unsubscribe();
  }
  store() {
    const value = this.controlForm('desayuno').value;
    console.log(value);
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchAlimentoComponent,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }
}
