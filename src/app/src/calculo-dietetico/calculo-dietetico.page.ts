import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from "@ionic/angular";
import { format } from "date-fns";
import autoTable from "jspdf-autotable";
import { Observable } from "rxjs";
import { DietaService } from "src/app/services/dieta.service";
import { StorageService } from "src/app/services/storage.local.service";
import { Actions } from "./actions.enum";
import { jsPDF } from "jspdf";
import { logoBase64 } from "../shared/img/img";
@Component({
  selector: "app-calculo-dietetico",
  templateUrl: "./calculo-dietetico.page.html",
  styleUrls: ["./calculo-dietetico.page.scss"],
})
export class CalculoDieteticoPage implements OnInit {
  public dietas$: Observable<any[]>;
  constructor(
    private dietaService: DietaService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private storageService: StorageService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.getAllData();
  }
  getAllData() {
    this.dietas$ = this.dietaService.getAll("calculo-dietetico");
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: `${message}`,
      duration: 2000,
      mode: "md",
    });
    toast.present();
  }
  createDiete() {
    this.router.navigate(["/calculo-dietetico/store"], {
      queryParams: {
        action: Actions.create,
      },
    });
  }
  public async downloadAsPDF(resp) {
    const doc = new jsPDF("landscape");

    const valueStorage: any = await this.storageService.buscarPorUid(
      "calculo-dietetico",
      resp.uid
    );
    const imageBase64 = logoBase64;
    doc.addImage(imageBase64, "JPEG", 260, 1, 20, 20);
    doc.setFontSize(14).text("Reporte de calculo dietetico: ", 15, 10);
    doc
      .setFontSize(8)
      .text(
        "Creado en la fecha: " +
          format(new Date(valueStorage.created_at), "dd/MM/yyyy"),
        15,
        15
      );
    doc
      .setFontSize(8)
      .text("Descripcion: " + valueStorage.descripcion, 15, 18.5);
    autoTable(doc, {
      margin: { top: 25 },
      tableWidth: "wrap",
      headStyles: {
        fontSize: 6,
        textColor: "#000",
        fontStyle: "bold",
        fillColor: "#d8d8d8",
      },
      bodyStyles: {
        fontSize: 4.5,
        lineColor: "#000000",
      },
      footStyles: {
        fontSize: 6,
        fillColor: "#d8d8d8",
        textColor: "#000",
      },
      head: [["Datos del sujeto", ""]],
      body: [
        ["Nombre: ", valueStorage.nombre],
        ["Edad: ", valueStorage.edad],
        ["Sexo: ", valueStorage.sexo],
        ["Talla (cm): ", valueStorage.talla],
        ["Nivel de Actividad física: ", valueStorage.nivelActividadFisica],
        ["Actividad Física:: ", valueStorage.actividadFisica],
        // ...
      ],
      // foot: [],
    });
    autoTable(doc, {
      margin: { left: 65 },
      startY: 25,
      tableWidth: "wrap",
      headStyles: {
        fontSize: 5,
        textColor: "#000",
        fontStyle: "bold",
        fillColor: "#d8d8d8",
      },
      bodyStyles: {
        fontSize: 4.5,
        lineColor: "#000000",
        minCellHeight: 2,
      },
      footStyles: {
        fontSize: 6,
        fillColor: "#d8d8d8",
        textColor: "#000",
      },
      head: [["Rutina diaria (F.A.F)", "Horas", "Promedio", ""]],
      body: [
        [
          "Descansar: ",
          valueStorage.rutina.descansar,
          valueStorage.rutina.descansarPromedio,
        ],
        [
          "Reposo: ",
          valueStorage.rutina.reposo,
          valueStorage.rutina.reposoPromedio,
        ],
        [
          "Estudiar: ",
          valueStorage.rutina.estudiar,
          valueStorage.rutina.estudiarPromedio,
        ],
        [
          "Caminar: ",
          valueStorage.rutina.caminar,
          valueStorage.rutina.caminarPromedio,
        ],
        [
          "Trabajar : ",
          valueStorage.rutina.trabajar,
          valueStorage.rutina.trabajarPromedio,
        ],
        [
          "Entrenar: ",
          valueStorage.rutina.entrenar,
          valueStorage.rutina.entrenarPromedio,
        ],
        [
          "",
          valueStorage.rutina.horasTotal,
          valueStorage.rutina.promedioTotal,
          valueStorage.rutina.totalGeneral,
        ],

        // ...
      ],
      // foot: [],
    });
    autoTable(doc, {
      margin: { top: 15 },
      tableWidth: "wrap",
      headStyles: {
        fontSize: 6,
        textColor: "#000",
        fontStyle: "bold",
        fillColor: "#d8d8d8",
      },
      bodyStyles: {
        fontSize: 4.5,
        lineColor: "#000000",
      },
      footStyles: {
        fontSize: 6,
        fillColor: "#d8d8d8",
        textColor: "#000",
      },
      head: [["Antropometría (Datos del ISAK)", ""]],
      body: [
        ["Peso (kg): ", valueStorage.antropometria.peso],
        ["Peso Objetivo (kg): ", valueStorage.antropometria.pesoObjectivo],
        ["Kg. Masa magra (D y W): ", valueStorage.antropometria.masaMagra],
        ["Kg. Masa grasa (D y W): ", valueStorage.antropometria.masaGrasa],
        ["Indice músculo/óseo: ", valueStorage.antropometria.indiceMusculo],
        ["Kg. Grasa a disminuir: ", valueStorage.antropometria.grasaDisminuir],
        [
          "Kg. Músculo para aumentar: ",
          valueStorage.antropometria.musculoAumentar,
        ],
        ["Suma 6 pliegues: ", valueStorage.antropometria.sumaPliegues],
        [
          "Suma 6 pliegues objetivo: ",
          valueStorage.antropometria.sumaPlieguesObjectivo,
        ],
        ["% Grasa(D y W): ", valueStorage.antropometria.grasa],
        ["% Grasa deseado (D y W): ", valueStorage.antropometria.grasaDeseado],

        // ...
      ],
      // foot: [],
    });
    autoTable(doc, {
      margin: { left: 60 },
      startY: 75,
      tableWidth: "wrap",
      headStyles: {
        fontSize: 5,
        textColor: "#000",
        fontStyle: "bold",
        fillColor: "#d8d8d8",
      },
      bodyStyles: {
        fontSize: 4.5,
        lineColor: "#000000",
        minCellHeight: 2,
      },
      footStyles: {
        fontSize: 6,
        fillColor: "#d8d8d8",
        textColor: "#000",
      },
      head: [["Calorías diarias (Harris Benedict 1990)", "", ""]],
      body: [
        ["GEB: ", valueStorage.caloriaDiaria.geb],
        ["ETA: ", valueStorage.caloriaDiaria.eta],
        ["GET: ", valueStorage.caloriaDiaria.get],
        ["Calorías FAF: ", valueStorage.caloriaDiaria.caloriaFaf],
        [
          "Déficit: ",
          valueStorage.caloriaDiaria.deficit,
          "Calorias: " + valueStorage.caloriaDiaria.deficitCaloria,
        ],
        [
          "Superávit: ",
          valueStorage.caloriaDiaria.superavit,
          "Calorias: " + valueStorage.caloriaDiaria.superavitCaloria,
        ],
        ["Reserva: ", valueStorage.caloriaDiaria.reserva],
        [
          "Calorías diarias elegidas: ",
          valueStorage.caloriaDiaria.caloriaDiariaElegida,
        ],
      ],
      // foot: [],
    });
    autoTable(doc, {
      // margin: { top: 45 },
      startY: 145,
      tableWidth: "wrap",
      headStyles: {
        fontSize: 6,
        textColor: "#000",
        fontStyle: "bold",
        fillColor: "#d8d8d8",
      },
      bodyStyles: {
        fontSize: 4.5,
        lineColor: "#000000",
      },
      footStyles: {
        fontSize: 6,
        fillColor: "#d8d8d8",
        textColor: "#000",
      },
      head: [["Distribución molécula calórica", "%"]],
      body: [
        ["Proteínas: ", valueStorage.distribucion.proteina + " %"],
        ["Carbohidratos: ", valueStorage.distribucion.carbohidratos + " %"],
        ["Grasas: ", valueStorage.distribucion.grasas + " %"],
        ["Total: ", valueStorage.distribucion.totalPorcentaje + " %"],
        // ...
      ],
      // foot: [],
    });
    const peso = Number(valueStorage.antropometria.peso);
    autoTable(doc, {
      margin: { left: 65 },
      startY: 145,
      tableWidth: "wrap",
      headStyles: {
        fontSize: 6,
        textColor: "#000",
        fontStyle: "bold",
        fillColor: "#d8d8d8",
      },
      bodyStyles: {
        fontSize: 4.5,
        lineColor: "#000000",
        halign: "center",
      },
      footStyles: {
        fontSize: 6,
        fillColor: "#d8d8d8",
        textColor: "#000",
      },
      head: [["Calorías Totales", "Gramos total", "Gramos/Kg (Peso actual)"]],
      body: [
        [
          valueStorage.distribucion.proteinaTotal,
          Number(valueStorage.distribucion.proteinaTotal) / 4,
          (Number(valueStorage.distribucion.proteinaTotal) / 4 / peso).toFixed(
            2
          ),
        ],
        [
          valueStorage.distribucion.carbohidratosTotal,
          Number(valueStorage.distribucion.carbohidratosTotal) / 4,
          (
            Number(valueStorage.distribucion.carbohidratosTotal) /
            4 /
            peso
          ).toFixed(2),
        ],
        [
          valueStorage.distribucion.grasasTotal,
          Number(valueStorage.distribucion.grasasTotal) / 4,
          (Number(valueStorage.distribucion.grasasTotal) / 4 / peso).toFixed(2),
        ],
        [valueStorage.distribucion.totalGeneral],
        // ...
      ],
      // foot: [],
    });
    doc.save(`calculo-dietetico-${Date.now().toString(32)}.pdf`);
  }
  async presentActionSheet(data: any) {
    const actionSheet = await this.actionSheetController.create({
      header: "Calculo dietetico",
      mode: "md",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Borrar",
          role: "destructive",
          icon: "trash",
          handler: async () => {
            this.presentAlertConfirm(data);
          },
        },
        {
          text: "Ver o Editar",
          icon: "book-outline",
          handler: async () => {
            this.router.navigate(["/calculo-dietetico/store"], {
              queryParams: { action: Actions.edit, uid: data.uid },
            });
            const valueStorage = await this.storageService.buscarPorUid(
              "calculo-dietetico",
              data.uid
            );
          },
        },
        {
          text: "Exportar",
          icon: "share-social-outline",
          handler: () => {
            this.downloadAsPDF(data);
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
  async presentAlertConfirm(data) {
    const alert = await this.alertController.create({
      header: "Confirmar!",
      message: "Estas seguro de <strong>eliminar</strong> este calculo!!!",
      mode: "md",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: "Aceptar",
          handler: async () => {
            await this.storageService.eliminarDato(
              data.uid,
              "calculo-dietetico"
            );
            this.getAllData();
            await this.presentToast(`Eliminado correctamente`);
          },
        },
      ],
    });

    await alert.present();
  }
}
