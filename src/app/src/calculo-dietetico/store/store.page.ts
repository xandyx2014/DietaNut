import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Actions } from "../actions.enum";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
const fieldsHora = [
  "descansarHora",
  "reposoHora",
  "estudiarHora",
  "caminarHora",
  "trabajarHora",
  "entrenarHora",
];
const fieldsPromedio = [
  "descansarPromedio",
  "reposoPromedio",
  "estudiarPromedio",
  "caminarPromedio",
  "trabajarPromedio",
  "entrenarPromedio",
];
@Component({
  selector: "app-store",
  templateUrl: "./store.page.html",
  styleUrls: ["./store.page.scss"],
})
export class StorePage implements OnInit {
  action: Actions;
  formGroup: FormGroup;
  fieldsHora = fieldsHora;
  fieldsPromedio = fieldsPromedio;
  public isOkey = false;
  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.route.queryParams.subscribe((params) => {
      this.action = Actions[params["action"]];
      this.createData();
    });
  }
  createData() {
    this.formGroup = this.fb.group({
      nombre: ["", Validators.required],
      edad: [0, Validators.required],
      sexo: ["HOMBRE", Validators.required],
      talla: ["", Validators.required],
      actividadFisica: ["", Validators.required],
      nivelActividadFisica: [0, Validators.required],
      fecha: [new Date().toISOString(), Validators.required],
      rutina: this.fb.group({
        descansar: [0, Validators.required],
        descansarHora: [1, Validators.required],
        descansarPromedio: [0],
        reposo: [0, Validators.required],
        reposoHora: [1, Validators.required],
        reposoPromedio: [0],
        estudiar: [0, Validators.required],
        estudiarHora: [1, Validators.required],
        estudiarPromedio: [0],
        caminar: [0, Validators.required],
        caminarHora: [1, Validators.required],
        caminarPromedio: [0],
        trabajar: [0, Validators.required],
        trabajarHora: [1, Validators.required],
        trabajarPromedio: [0],
        entrenar: [0, Validators.required],
        entrenarHora: [1, Validators.required],
        entrenarPromedio: [0],
        horasTotal: [0],
        promedioTotal: [0],
        totalGeneral: [0],
      }),
    });
    this.formGroup.valueChanges.subscribe((e) => {
      console.log(e);
    });
    this.isOkey = true;
  }
  getPromedioRutina(modelForm) {
    const valorForm = this.formGroup.get("rutina").value[modelForm];
    const horaForm = this.formGroup.get("rutina").value[`${modelForm}Hora`];
    const valueA = isNaN(Number(valorForm)) ? 1 : Number(valorForm);
    const valueB = isNaN(Number(horaForm)) ? 0 : Number(horaForm);
    const promedio = valueA * valueB;
    this.formGroup.get("rutina").patchValue(
      {
        [`${modelForm}Promedio`]: Number(promedio).toFixed(2),
      },
      { emitEvent: false }
    );

    return promedio.toFixed(2);
  }
  getRutinaReposo() {
    const descansarHora = this.formGroup.get("rutina").value[`descansarHora`];
    const estudiarHora = this.formGroup.get("rutina").value[`estudiarHora`];
    const caminarHora = this.formGroup.get("rutina").value[`caminarHora`];
    const trabajarHora = this.formGroup.get("rutina").value[`trabajarHora`];
    const entrenarHora = this.formGroup.get("rutina").value[`entrenarHora`];
    const reposoPromedio =
      24 -
      (descansarHora +
        estudiarHora +
        caminarHora +
        trabajarHora +
        entrenarHora);
    this.formGroup.get("rutina").patchValue(
      {
        [`reposoHora`]: Number(reposoPromedio).toFixed(2),
      },
      { emitEvent: false }
    );
    return reposoPromedio;
  }
  getRutinaTotal(fiedls: string[], model) {
    let total = 0;
    fiedls.forEach((e) => {
      total = total + Number(this.formGroup.get("rutina").value[e]);
    });
    this.formGroup.get("rutina").patchValue(
      {
        [model]: Number(total).toFixed(2),
      },
      { emitEvent: false }
    );
    return Number(total).toFixed(2);
  }
  getRutinaTotalGeneral() {
    const horasTotal = Number(this.formGroup.get("rutina").value["horasTotal"]);
    const promedioTotal = Number(
      this.formGroup.get("rutina").value["promedioTotal"]
    );
    const totalGeneral = promedioTotal / horasTotal;
    this.formGroup.get("rutina").patchValue(
      {
        ["totalGeneral"]: Number(totalGeneral).toFixed(2),
      },
      { emitEvent: false }
    );
    return Number(totalGeneral).toFixed(2);
  }
  store() {
    console.log(this.formGroup.value);
  }
}
