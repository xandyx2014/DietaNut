import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DietaService } from 'src/app/services/dieta.service';
import { StorageService } from 'src/app/services/storage.local.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
@Component({
  selector: 'app-intercambio',
  templateUrl: './intercambio.page.html',
  styleUrls: ['./intercambio.page.scss'],
})
export class IntercambioPage implements OnInit {
  public dietas$: Observable<any[]>;
  constructor(
    private dietaService: DietaService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private storageService: StorageService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.getAllDietas();
  }
  getAllDietas() {
    this.dietas$ = this.dietaService.getAll('intercambio');
  }
  public async downloadAsPDF(resp) {
    const doc = new jsPDF();
    const valueStorage: any = await this.storageService.buscarPorUid('intercambio', resp.uid);
    console.log(valueStorage);
    doc.setFontSize(16).text('Reporte de dieta: ' + valueStorage.titulo, 15, 10);
    doc.setFontSize(8).text('Creado en la fecha: ' + format(
      new Date(valueStorage.created_at), 'dd/MM/yyyy') , 15, 15);
    doc.setFontSize(8).text('Descripcion: ' + valueStorage.descripcion, 15, 20);
    doc.text(`Gasto energetico: ${valueStorage.calorias.gastoEnergetico}`, 15, 34);
    autoTable(doc, {
      theme: 'striped',
      margin: { top: 35 },
      head: [
        ['Macronutrientes', '%', 'Calorias', 'Gramos']
      ],
      headStyles: {
        fillColor: '#b5baf7',
        textColor: '#000'
      },
      body: [
        [
          'Carbohidrato',
          valueStorage.calorias.carbohidrato,
          valueStorage.calorias.carbohidratoCaloria,
          valueStorage.calorias.carbohidratoGramo
        ],
        [
          'Proteina',
          valueStorage.calorias.proteina,
          valueStorage.calorias.proteinaCaloria,
          valueStorage.calorias.proteinaGramo
        ],
        [
          'Grasas',
          valueStorage.calorias.grasas,
          valueStorage.calorias.grasasCaloria,
          valueStorage.calorias.grasasGramo
        ],
        [
          'Total',
          valueStorage.calorias.total,
          valueStorage.calorias.totalCaloria,
          valueStorage.calorias.totalGramo
        ],
      ],
    }
    );
    autoTable(doc, {
      theme: 'grid',
      headStyles: {
        textColor: '#000'
      },
      head: [
        ['Ingesta', '', '', '', '', ''],
        ['Grupo de alimentos', 'Porcion', 'Energia', 'Proteinas', 'Lipidos', 'Carbohidratos']],
      body: [
        [
          'Cereales y derivados',
          valueStorage.ingesta.cereales.racion,
          valueStorage.ingesta.cereales.energia,
          valueStorage.ingesta.cereales.proteina,
          valueStorage.ingesta.cereales.lipido,
          valueStorage.ingesta.cereales.carbohidrato,
        ],
        [
          'Verduras',
          valueStorage.ingesta.verduras.racion,
          valueStorage.ingesta.verduras.energia,
          valueStorage.ingesta.verduras.proteina,
          valueStorage.ingesta.verduras.lipido,
          valueStorage.ingesta.verduras.carbohidrato,
        ],
        [
          'Frutas',
          valueStorage.ingesta.frutas.racion,
          valueStorage.ingesta.frutas.energia,
          valueStorage.ingesta.frutas.proteina,
          valueStorage.ingesta.frutas.lipido,
          valueStorage.ingesta.frutas.carbohidrato,
        ],
        [
          'Leche y derivados',
          valueStorage.ingesta.leche.racion,
          valueStorage.ingesta.leche.energia,
          valueStorage.ingesta.leche.proteina,
          valueStorage.ingesta.leche.lipido,
          valueStorage.ingesta.leche.carbohidrato,
        ],
        [
          'Carne, pesecado y huevos',
          valueStorage.ingesta.carne.racion,
          valueStorage.ingesta.carne.energia,
          valueStorage.ingesta.carne.proteina,
          valueStorage.ingesta.carne.lipido,
          valueStorage.ingesta.carne.carbohidrato,
        ],
        [
          'Producto azucarados',
          valueStorage.ingesta.azucarados.racion,
          valueStorage.ingesta.azucarados.energia,
          valueStorage.ingesta.azucarados.proteina,
          valueStorage.ingesta.azucarados.lipido,
          valueStorage.ingesta.azucarados.carbohidrato,
        ],
        [
          'Grasas',
          valueStorage.ingesta.grasas.racion,
          valueStorage.ingesta.grasas.energia,
          valueStorage.ingesta.grasas.proteina,
          valueStorage.ingesta.grasas.lipido,
          valueStorage.ingesta.grasas.carbohidrato,
        ],
        [
          'Total',
          valueStorage.ingesta.totalRacion,
          valueStorage.ingesta.totalEnergia,
          valueStorage.ingesta.totalProteina,
          valueStorage.ingesta.totalLipido,
          valueStorage.ingesta.totalCarbohidrato,
        ],
        [
          'Requerimiento',
          valueStorage.ingesta.requerimiento.racion,
          valueStorage.ingesta.requerimiento.energia,
          valueStorage.ingesta.requerimiento.proteina,
          valueStorage.ingesta.requerimiento.lipido,
          valueStorage.ingesta.requerimiento.carbohidrato,
        ],
        [
          '% Adecuacion',
          `${valueStorage.ingesta.adecuacion.racion} %`,
          `${valueStorage.ingesta.adecuacion.energia} %`,
          `${valueStorage.ingesta.adecuacion.proteina} %`,
          `${valueStorage.ingesta.adecuacion.lipido} %`,
          `${valueStorage.ingesta.adecuacion.carbohidrato} %`,
        ],
      ],
    }
    );
    autoTable(doc, {
      // theme: 'striped',
      margin: { top: 30 },
      headStyles: {
        textColor: '#000'
      },
      head: [
        ['Distribución de porciones', '', '', '', '', '', ''],
        ['Grupo de alimentos', 'Porcion', 'Desayuno', 'Merienda', 'Almuerzo', 'Merienda', 'Cena']
      ],
      body: [
        [
          'Cereales y derivados',
          `${valueStorage.distribucion.cereales.racion}`,
          `${valueStorage.distribucion.cereales.desayuno}`,
          `${valueStorage.distribucion.cereales.merienda}`,
          `${valueStorage.distribucion.cereales.almuerzo}`,
          `${valueStorage.distribucion.cereales.merienda}`,
          `${valueStorage.distribucion.cereales.cena}`,
        ],
        [
          'Verduras',
          `${valueStorage.distribucion.verduras.racion}`,
          `${valueStorage.distribucion.verduras.desayuno}`,
          `${valueStorage.distribucion.verduras.merienda}`,
          `${valueStorage.distribucion.verduras.almuerzo}`,
          `${valueStorage.distribucion.verduras.merienda}`,
          `${valueStorage.distribucion.verduras.cena}`,
        ],
        [
          'Frutas',
          `${valueStorage.distribucion.frutas.racion}`,
          `${valueStorage.distribucion.frutas.desayuno}`,
          `${valueStorage.distribucion.frutas.merienda}`,
          `${valueStorage.distribucion.frutas.almuerzo}`,
          `${valueStorage.distribucion.frutas.merienda}`,
          `${valueStorage.distribucion.frutas.cena}`,
        ],
        [
          'Leche y derivados',
          `${valueStorage.distribucion.leche.racion}`,
          `${valueStorage.distribucion.leche.desayuno}`,
          `${valueStorage.distribucion.leche.merienda}`,
          `${valueStorage.distribucion.leche.almuerzo}`,
          `${valueStorage.distribucion.leche.merienda}`,
          `${valueStorage.distribucion.leche.cena}`,
        ],
        [
          'Carne, pescado y huevos',
          `${valueStorage.distribucion.carne.racion}`,
          `${valueStorage.distribucion.carne.desayuno}`,
          `${valueStorage.distribucion.carne.merienda}`,
          `${valueStorage.distribucion.carne.almuerzo}`,
          `${valueStorage.distribucion.carne.merienda}`,
          `${valueStorage.distribucion.carne.cena}`,
        ],
        [
          'Productos azucarados',
          `${valueStorage.distribucion.azucarados.racion}`,
          `${valueStorage.distribucion.azucarados.desayuno}`,
          `${valueStorage.distribucion.azucarados.merienda}`,
          `${valueStorage.distribucion.azucarados.almuerzo}`,
          `${valueStorage.distribucion.azucarados.merienda}`,
          `${valueStorage.distribucion.azucarados.cena}`,
        ],
        [
          'Grasas',
          `${valueStorage.distribucion.grasas.racion}`,
          `${valueStorage.distribucion.grasas.desayuno}`,
          `${valueStorage.distribucion.grasas.merienda}`,
          `${valueStorage.distribucion.grasas.almuerzo}`,
          `${valueStorage.distribucion.grasas.merienda}`,
          `${valueStorage.distribucion.grasas.cena}`,
        ]
      ],
    }
    );
    doc.save('distribucion_dieta.pdf');
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: `${message}`,
      duration: 2000,
      mode: 'md'
    });
    toast.present();
  }
  async presentActionSheet(dieta: any) {
    const actionSheet = await this.actionSheetController.create({
      header: dieta.titulo,
      mode: 'md',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Borrar',
        role: 'destructive',
        icon: 'trash',
        handler: async () => {
          this.presentAlertConfirm(dieta);
        }
      }, {
        text: 'Ver o Editar',
        icon: 'book-outline',
        handler: async () => {
          this.router.navigate(['/intercambio/store'], { queryParams: { edit: true, uid: dieta.uid } });
          const valueStorage = await this.storageService.buscarPorUid('composicion', dieta.uid);
        }
      }, {
        text: 'Exportar',
        icon: 'share-social-outline',
        handler: () => {
          this.downloadAsPDF(dieta);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async presentAlertConfirm(dieta) {
    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: 'Estas seguro de <strong>eliminar</strong> esta receta!!!',
      mode: 'md',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: async () => {
            await this.storageService.eliminarDato(dieta.uid, 'intercambio');
            this.getAllDietas();
            await this.presentToast(`Eliminado ${dieta.titulo}`);
          }
        }
      ]
    });

    await alert.present();
  }
}
