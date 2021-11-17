import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from "@ionic/angular";
import { Observable } from "rxjs";
import { DietaService } from "src/app/services/dieta.service";
import { StorageService } from "src/app/services/storage.local.service";
import { Actions } from "./actions.enum";

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
  async presentActionSheet(dieta: any) {
    const actionSheet = await this.actionSheetController.create({
      header: dieta.titulo,
      mode: "md",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Borrar",
          role: "destructive",
          icon: "trash",
          handler: async () => {
            this.presentAlertConfirm(dieta);
          },
        },
        {
          text: "Ver o Editar",
          icon: "book-outline",
          handler: async () => {
            this.router.navigate(["/composicion/store"], {
              queryParams: { edit: true, uid: dieta.uid },
            });
            const valueStorage = await this.storageService.buscarPorUid(
              "composicion",
              dieta.uid
            );
          },
        },
        {
          text: "Exportar",
          icon: "share-social-outline",
          handler: () => {
            // this.downloadAsPDF(dieta);
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
  async presentAlertConfirm(dieta) {
    const alert = await this.alertController.create({
      header: "Confirmar!",
      message: "Estas seguro de <strong>eliminar</strong> esta receta!!!",
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
            await this.storageService.eliminarDato(dieta.uid, "composicion");
            this.getAllData();
            await this.presentToast(`Eliminado ${dieta.titulo}`);
          },
        },
      ],
    });

    await alert.present();
  }
}
