import { AlertController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Actions } from "../actions.enum";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { StorageService } from "src/app/services/storage.local.service";
import { AlertOptions } from "@ionic/core";
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
  private valueUpdate: any = {};
  public isOkey = false;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private alertController: AlertController,
    private storageLocal: StorageService,
    private router: Router
  ) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.route.queryParams.subscribe(async (params) => {
      this.action = Number(params.action) === 1 ? Actions.edit : Actions.create;
      if (this.action === Actions.edit) {
        this.valueUpdate = await this.storageLocal.buscarPorUid(
          "calculo-dietetico",
          params.uid
        );
      }
      this.createData();
    });
  }
  createData() {
    this.formGroup = this.fb.group({
      uid: [
        this.valueUpdate.uid ??
          `${Date.now().toString()}-${Date.now().toString(32)}`,
      ],
      descripcion: [this.valueUpdate?.descripcion ?? ""],
      created_at: [this.valueUpdate?.created_at ?? new Date().toString()],
      nombre: [this.valueUpdate?.nombre ?? "", Validators.required],
      edad: [this.valueUpdate?.edad ?? 0, Validators.required],
      sexo: [this.valueUpdate?.sexo ?? "HOMBRE", Validators.required],
      talla: [this.valueUpdate?.talla ?? 0, Validators.required],
      actividadFisica: [
        this.valueUpdate?.actividadFisica ?? 0,
        Validators.required,
      ],
      nivelActividadFisica: [
        this.valueUpdate?.nivelActividadFisica ?? 0,
        Validators.required,
      ],
      rutina: this.fb.group({
        descansar: [{ value: 1, disabled: true }],
        descansarHora: [this.valueUpdate?.rutina?.descansarHora ?? 1],
        descansarPromedio: [this.valueUpdate?.rutina?.descansarPromedio ?? 0],
        reposo: [this.valueUpdate?.rutina?.reposo ?? 1],
        reposoHora: [this.valueUpdate?.rutina?.reposoHora ?? 1],
        reposoPromedio: [this.valueUpdate?.rutina?.reposoPromedio ?? 0],
        estudiar: [1.2],
        estudiarHora: [this.valueUpdate?.rutina?.estudiarHora ?? 1],
        estudiarPromedio: [this.valueUpdate?.rutina?.estudiarPromedio ?? 0],
        caminar: [1.5 ?? 0],
        caminarHora: [this.valueUpdate?.rutina?.caminarHora ?? 1],
        caminarPromedio: [this.valueUpdate?.rutina?.caminarPromedio ?? 0],
        trabajar: [this.valueUpdate?.rutina?.trabajar ?? 2],
        trabajarHora: [this.valueUpdate?.rutina?.trabajarHora ?? 1],
        trabajarPromedio: [this.valueUpdate?.rutina?.trabajarPromedio ?? 0],
        entrenar: [this.valueUpdate?.rutina?.entrenar ?? 5],
        entrenarHora: [this.valueUpdate?.rutina?.entrenarHora ?? 1],
        entrenarPromedio: [this.valueUpdate?.rutina?.entrenarPromedio ?? 0],
        horasTotal: [this.valueUpdate?.rutina?.horasTotal ?? 0],
        promedioTotal: [this.valueUpdate?.rutina?.promedioTotal ?? 0],
        totalGeneral: [this.valueUpdate?.rutina?.totalGeneral ?? 0],
      }),
      antropometria: this.fb.group({
        peso: [this.valueUpdate?.antropometria?.peso ?? 1],
        pesoObjectivo: [this.valueUpdate?.antropometria?.pesoObjectivo ?? 0],
        masaMagra: [this.valueUpdate?.antropometria?.masaMagra ?? 0],
        masaGrasa: [this.valueUpdate?.antropometria?.masaGrasa ?? 0],
        indiceMusculo: [this.valueUpdate?.antropometria?.indiceMusculo ?? 0],
        grasaDisminuir: [this.valueUpdate?.antropometria?.grasaDisminuir ?? 0],
        musculoAumentar: [
          this.valueUpdate?.antropometria?.musculoAumentar ?? 0,
        ],
        sumaPliegues: [this.valueUpdate?.antropometria?.sumaPliegues ?? 0],
        sumaPlieguesObjectivo: [
          this.valueUpdate?.antropometria?.sumaPlieguesObjectivo ?? 0,
        ],
        grasa: [this.valueUpdate?.antropometria?.grasa ?? 0],
        grasaDeseado: [this.valueUpdate?.antropometria?.grasaDeseado ?? 0],
      }),
      caloriaDiaria: this.fb.group({
        geb: [this.valueUpdate?.caloriaDiaria?.geb ?? 0],
        eta: [this.valueUpdate?.caloriaDiaria?.eta ?? 0],
        etaPorcentaje: [this.valueUpdate?.caloriaDiaria?.etaPorcentaje ?? 5],
        get: [this.valueUpdate?.caloriaDiaria?.get ?? 0],
        caloriaFaf: [this.valueUpdate?.caloriaDiaria?.caloriaFaf ?? 0],
        deficitCaloria: [this.valueUpdate?.caloriaDiaria?.deficitCaloria ?? 0],
        deficit: [this.valueUpdate?.caloriaDiaria?.deficit ?? 0],
        superavitCaloria: [
          this.valueUpdate?.caloriaDiaria?.superavitCaloria ?? 0,
        ],
        superavit: [this.valueUpdate?.caloriaDiaria?.superavit ?? 0],
        reserva: [this.valueUpdate?.caloriaDiaria?.reserva ?? 0],
        caloriaDiariaElegida: [
          this.valueUpdate?.caloriaDiaria?.caloriaDiariaElegida ?? 0,
        ],
      }),
      distribucion: this.fb.group({
        proteina: [this.valueUpdate?.distribucion?.proteina ?? 0],
        proteinaTotal: [this.valueUpdate?.distribucion?.proteinaTotal ?? 0],
        carbohidratos: [this.valueUpdate?.distribucion?.carbohidratos ?? 0],
        carbohidratosTotal: [
          this.valueUpdate?.distribucion?.carbohidratosTotal ?? 0,
        ],
        grasas: [this.valueUpdate?.distribucion?.grasas ?? 0],
        grasasTotal: [this.valueUpdate?.distribucion?.grasasTotal ?? 0],
        totalPorcentaje: [this.valueUpdate?.distribucion?.totalPorcentaje ?? 0],
        totalGeneral: [this.valueUpdate?.distribucion?.totalGeneral ?? 0],
      }),
    });
    /*  this.formGroup.valueChanges.subscribe((e) => {
      console.log(e);
    }); */
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
  getDistribucionTotalPorcentaje() {
    const proteina = Number(
      this.formGroup.get("distribucion").value["proteina"]
    );
    const carbohidratos = Number(
      this.formGroup.get("distribucion").value["carbohidratos"]
    );
    const grasas = Number(this.formGroup.get("distribucion").value["grasas"]);
    const total = proteina + carbohidratos + grasas;
    this.formGroup.get("distribucion").patchValue(
      {
        ["totalPorcentaje"]: Number(total).toFixed(2),
      },
      { emitEvent: false }
    );
    return total.toFixed(2);
  }
  getCaloriaTotal(type: string, total: string) {
    const typeValue = Number(this.formGroup.get("distribucion").value[type]);
    const caloriaDiariaElegida = Number(
      this.formGroup.get("caloriaDiaria").value["caloriaDiariaElegida"]
    );
    const totalCaloria = (typeValue * caloriaDiariaElegida) / 100;
    this.formGroup.get("distribucion").patchValue(
      {
        [total]: Number(totalCaloria).toFixed(2),
      },
      { emitEvent: false }
    );
    return totalCaloria.toFixed(2);
  }
  getTotalGeneralCalorias() {
    const proteinaTotal = Number(
      this.formGroup.get("distribucion").value["proteinaTotal"]
    );
    const carbohidratosTotal = Number(
      this.formGroup.get("distribucion").value["carbohidratosTotal"]
    );
    const grasasTotal = Number(
      this.formGroup.get("distribucion").value["grasasTotal"]
    );
    const totalGeneralCalorias =
      proteinaTotal + carbohidratosTotal + grasasTotal;
    this.formGroup.get("distribucion").patchValue(
      {
        ["totalGeneral"]: Number(totalGeneralCalorias).toFixed(2),
      },
      { emitEvent: false }
    );
    return totalGeneralCalorias.toFixed(2);
  }
  private async alertMessage(el) {
    if (this.formGroup.invalid) {
      this.formGroup.markAsDirty();
      this.formGroup.markAllAsTouched();
      window.scroll(0, 0);
      el.scrollIntoView();
      const alertError = await this.alertController.create({
        header: "Alerta",
        mode: "md",
        subHeader: "Falta un titulo a la dieta",
        buttons: ["Aceptar"],
      });
      await alertError.present();
      return true;
    }
    return false;
  }
  private async successTask(opts: AlertOptions) {
    await this.router.navigate(["/home"]);
    const alertSuccesStorage = await this.alertController.create({ ...opts });
    return await alertSuccesStorage.present();
  }
  async store(el: HTMLElement) {
    const respMessage = await this.alertMessage(el);
    if (respMessage) {
      return;
    }
    const value = this.formGroup.value;
    if (this.action === Actions.create) {
      await this.storageLocal.guardarDatos({
        dato: value,
        referencia: "calculo-dietetico",
      });
    }
    if (this.action === Actions.edit) {
      await this.storageLocal.actualizarDato(
        value.uid,
        value,
        "calculo-dietetico"
      );
    }

    await this.successTask({
      header: "Exito",
      mode: "md",
      subHeader: "Se ha guardado tu calculo correctamente",
      message: "Puedes revisarlo en tu lista de calculos dieteticos",
      buttons: ["Aceptar"],
    });
  }
}
