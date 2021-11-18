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
      talla: [0, Validators.required],
      actividadFisica: [0, Validators.required],
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
      antropometria: this.fb.group({
        peso: [0, Validators.required],
        pesoObjectivo: [0, Validators.required],
        masaMagra: [0, Validators.required],
        masaGrasa: [0, Validators.required],
        indiceMusculo: [0, Validators.required],
        grasaDisminuir: [0, Validators.required],
        musculoAumentar: [0, Validators.required],
        sumaPliegues: [0, Validators.required],
        sumaPlieguesObjectivo: [0, Validators.required],
        grasa: [0, Validators.required],
        grasaDeseado: [0],
      }),
      caloriaDiaria: this.fb.group({
        geb: [0],
        eta: [0],
        etaPorcentaje: [5],
        get: [0],
        caloriaFaf: [0],
        deficitCaloria: [0],
        deficit: [0],
        superavitCaloria: [0],
        superavit: [0],
        reserva: [0],
        caloriaDiariaElegida: [0],
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
  getAntropometriaPesoObjectivo() {
    const peso = Number(this.formGroup.get("antropometria").value["peso"]);
    const musculoAumentar = Number(
      this.formGroup.get("antropometria").value["musculoAumentar"]
    );
    const grasaDisminuir = Number(
      this.formGroup.get("antropometria").value["grasaDisminuir"]
    );
    const pesoObjectivo = peso + musculoAumentar - grasaDisminuir;
    this.formGroup.get("antropometria").patchValue(
      {
        ["pesoObjectivo"]: Number(pesoObjectivo).toFixed(2),
      },
      { emitEvent: false }
    );
    return pesoObjectivo.toFixed(2);
  }
  getCaloriaDiariaGeb() {
    const peso = Number(this.formGroup.get("antropometria").value["peso"]);
    const talla = Number(this.formGroup.value["talla"]);
    const edad = Number(this.formGroup.value["edad"]);
    const sexo = this.formGroup.value["sexo"] === "HOMBRE" ? 5 : -161;
    const geb = 10 * peso + 6.25 * talla - 5 * edad + sexo;
    this.formGroup.get("caloriaDiaria").patchValue(
      {
        ["geb"]: Number(geb).toFixed(2),
      },
      { emitEvent: false }
    );
    return geb.toFixed(2);
  }
  getCaloriaDiariaEta() {
    const geb = Number(this.formGroup.get("caloriaDiaria").value["geb"]);
    const etaPorcentaje = Number(
      this.formGroup.get("caloriaDiaria").value["etaPorcentaje"]
    );
    const eta = geb + geb * (etaPorcentaje / 100);
    this.formGroup.get("caloriaDiaria").patchValue(
      {
        ["eta"]: Number(eta).toFixed(2),
      },
      { emitEvent: false }
    );
    return eta.toFixed(2);
  }
  getCaloriaDiariaGet() {
    const eta = Number(this.formGroup.get("caloriaDiaria").value["eta"]);
    const actividadFisica = Number(this.formGroup.value["actividadFisica"]);
    const get = eta * actividadFisica;
    this.formGroup.get("caloriaDiaria").patchValue(
      {
        ["get"]: Number(get).toFixed(2),
      },
      { emitEvent: false }
    );
    return get.toFixed(2);
  }
  getCaloriaDiariaFaf() {
    const get = Number(this.formGroup.get("caloriaDiaria").value["get"]);
    const eta = Number(this.formGroup.get("caloriaDiaria").value["eta"]);
    const faf = get - eta;
    this.formGroup.get("caloriaDiaria").patchValue(
      {
        ["caloriaFaf"]: Number(faf).toFixed(2),
      },
      { emitEvent: false }
    );
    return faf.toFixed(2);
  }
  getCaloriaDiariaDeficit() {
    const get = Number(this.formGroup.get("caloriaDiaria").value["get"]);
    const caloria = Number(
      this.formGroup.get("caloriaDiaria").value["deficitCaloria"]
    );
    const valueCaloria = isNaN(caloria) ? 0 : caloria;
    const deficit = get - valueCaloria;
    this.formGroup.get("caloriaDiaria").patchValue(
      {
        ["deficit"]: Number(deficit).toFixed(2),
      },
      { emitEvent: false }
    );
    return deficit.toFixed(2);
  }
  getCaloriaDiariaSuperavit() {
    const get = Number(this.formGroup.get("caloriaDiaria").value["get"]);
    const caloria = Number(
      this.formGroup.get("caloriaDiaria").value["superavitCaloria"]
    );
    const valueCaloria = isNaN(caloria) ? 0 : caloria;
    const deficit = get + valueCaloria;
    this.formGroup.get("caloriaDiaria").patchValue(
      {
        ["superavit"]: Number(deficit).toFixed(2),
      },
      { emitEvent: false }
    );
    return deficit.toFixed(2);
  }
  getCaloriaDiaraReserva() {
    const masaMagra = Number(
      this.formGroup.get("antropometria").value["masaMagra"]
    );
    const masaMagraValue = isNaN(masaMagra) ? 1 : masaMagra;
    const caloriaFaf = Number(
      this.formGroup.get("caloriaDiaria").value["caloriaFaf"]
    );
    const reserva = masaMagraValue * 30 + caloriaFaf;
    this.formGroup.get("caloriaDiaria").patchValue(
      {
        ["reserva"]: Number(reserva).toFixed(2),
      },
      { emitEvent: false }
    );
    return reserva.toFixed(2);
  }
  store() {
    console.log(this.formGroup.value);
  }
}
