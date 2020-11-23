import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DietaService } from 'src/app/services/dieta.service';
import { StorageService } from 'src/app/services/storage.local.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as sumBy from 'lodash.sumby';
import { format, parseISO } from 'date-fns';
@Component({
  selector: 'app-composicion',
  templateUrl: './composicion.page.html',
  styleUrls: ['./composicion.page.scss'],
})
export class ComposicionPage implements OnInit {
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
  public async downloadAsPDF(resp) {
    const doc = new jsPDF('landscape');
    const valueStorage: any = await this.storageService.buscarPorUid('composicion', resp.uid);
    console.log(valueStorage);
    doc.setFontSize(16).text('Reporte de dieta: ' + valueStorage.titulo, 15, 10);
    doc.setFontSize(8).text('Creado en la fecha: ' + format(
      new Date(valueStorage.created_at), 'dd/MM/yyyy') , 15, 15);
    doc.setFontSize(8).text('Descripcion: ' + valueStorage.descripcion, 15, 22);
    autoTable(doc, {
      theme: 'grid',
      margin: { top: 35 },
      headStyles: {
        fontSize: 6,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 6,
      },
      head: [
        this.setHelearPdf()
      ],
      body: this.setRowInput(valueStorage, 'desayuno'),
      footStyles: {
        fontSize: 6,
      },
      foot: [
        this.setFootSubTotal(valueStorage, 'desayuno'),
        [
          'Desayuno'
        ],
      ]
    });
    autoTable(doc, {
      theme: 'grid',
      margin: { top: 30 },
      headStyles: {
        fontSize: 6,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 6,
      },
      head: [
        this.setHelearPdf()
      ],
      body: this.setRowInput(valueStorage, 'merienda'),
      footStyles: {
        fontSize: 6,
      },
      foot: [
        this.setFootSubTotal(valueStorage, 'merienda'),
        [
          'Merienda'
        ],
      ]
    });
    autoTable(doc, {
      theme: 'grid',
      margin: { top: 30 },
      headStyles: {
        fontSize: 6,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 6,
      },
      head: [
        this.setHelearPdf()
      ],
      body: this.setRowInput(valueStorage, 'almuerzo'),
      footStyles: {
        fontSize: 6,
      },
      foot: [
        this.setFootSubTotal(valueStorage, 'almuerzo'),
        [
          'Almuerzo'
        ],
      ]
    });
    autoTable(doc, {
      theme: 'grid',
      margin: { top: 30 },
      headStyles: {
        fontSize: 6,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 6,
      },
      head: [
        this.setHelearPdf()
      ],
      body: this.setRowInput(valueStorage, 'te'),
      footStyles: {
        fontSize: 6,
      },
      foot: [
        this.setFootSubTotal(valueStorage, 'te'),
        [
          'Merienda'
        ],
      ]
    });
    autoTable(doc, {
      theme: 'grid',
      margin: { top: 30 },
      headStyles: {
        fontSize: 6,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 6,
      },
      head: [
        this.setHelearPdf()
      ],
      body: this.setRowInput(valueStorage, 'cena'),
      footStyles: {
        fontSize: 6,
      },
      foot: [
        this.setFootSubTotal(valueStorage, 'cena'),
        [
          'Cena'
        ],
      ]
    });
    autoTable(doc, {
      theme: 'grid',
      margin: { top: 30 },
      headStyles: {
        fontSize: 6,
        fontStyle: 'bold',
        fillColor: '#b5baf7'
      },
      bodyStyles: {
        fontSize: 6,
      },
      head: [
        this.setHelearPdf()
      ],
      body: [
        this.setTotalValueRow(valueStorage),
        this.setTotalAdec(valueStorage),
        this.setTotalReq(valueStorage),
      ],
      footStyles: {
        fontSize: 6,
        fillColor: '#3880ff'
      },
    });
    const energiaTotal = this.getTotalGral(valueStorage, 'energia');
    console.log(energiaTotal);
    doc.save('composicion.pdf');
  }
  setTotalAdec(valueStorage: any) {
    const e = valueStorage.req;
    return [
      `Requerimiento`,
      ``,
      `${e.energia}`,
      `${e.humedad}`,
      `${e.proteina}`,
      `${e.grasa}`,
      `${e.hc}`,
      `${e.fibra_cruda}`,
      `${e.ceniza}`,
      `${e.calcio}`,
      `${e.fosforo}`,
      `${e.hierro}`,
      `${e.vit_a}`,
      `${e.tiamina}`,
      `${e.riboflavina}`,
      `${e.niacina}`,
      `${e.vit_c}`,
      `${e.agm}`,
      `${e.agp}`,
      `${e.ags}`,
      `${e.col}`,
      `${e.potasio}`,
      `${e.sodio}`,
      `${e.zinc}`,
      `${e.vit_b12}`
    ];
  }
  setTotalReq(valueStorage: any) {
    const e = valueStorage.req;
    return [
      `% Adec`,
      ``,
      `${ ( ( this.getTotalGral(valueStorage, 'energia')  / e.energia) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'humedad')   / e.humedad) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'proteina')   / e.proteina) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'grasa')   / e.grasa) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'hc')   / e.hc) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'fibra_cruda')   / e.fibra_cruda) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'ceniza')   / e.ceniza) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'calcio')   / e.calcio) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'fosforo')   / e.fosforo) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'hierro')   / e.hierro) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'vit_a')   / e.vit_a) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'tiamina')   / e.tiamina) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'riboflavina')   / e.riboflavina) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'niacina')   / e.niacina) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'vit_c')   / e.vit_c) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'agm')   / e.agm) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'agp')   / e.agp) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'ags')   / e.ags) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'col')   / e.col) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'potasio')   / e.potasio) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'sodio')   / e.sodio) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'zinc')   / e.zinc) * 100).toFixed(2) } %`,
      `${ ( ( this.getTotalGral(valueStorage, 'vit_b12')   / e.vit_b12) * 100).toFixed(2)} %`
    ];
  }
  setTotalValueRow(valueStorage) {
    return [
      `Total Gral`,
      `${ this.getTotalGral(valueStorage, 'cantidad') }`,
      `${ this.getTotalGral(valueStorage, 'energia') }`,
      `${ this.getTotalGral(valueStorage, 'humedad') }`,
      `${ this.getTotalGral(valueStorage, 'proteina') }`,
      `${this.getTotalGral(valueStorage, 'grasa')}`,
      `${this.getTotalGral(valueStorage, 'hc')}`,
      `${this.getTotalGral(valueStorage, 'fibra_cruda')}`,
      `${this.getTotalGral(valueStorage, 'ceniza')}`,
      `${this.getTotalGral(valueStorage, 'calcio')}`,
      `${this.getTotalGral(valueStorage, 'fosforo')}`,
      `${this.getTotalGral(valueStorage, 'hierro')}`,
      `${this.getTotalGral(valueStorage, 'vit_a')}`,
      `${this.getTotalGral(valueStorage, 'tiamina')}`,
      `${this.getTotalGral(valueStorage, 'riboflavina')}`,
      `${this.getTotalGral(valueStorage, 'niacina')}`,
      `${this.getTotalGral(valueStorage, 'vit_c')}`,
      `${this.getTotalGral(valueStorage, 'agm')}`,
      `${this.getTotalGral(valueStorage, 'agp')}`,
      `${this.getTotalGral(valueStorage, 'ags')}`,
      `${this.getTotalGral(valueStorage, 'col')}`,
      `${this.getTotalGral(valueStorage, 'potasio')}`,
      `${this.getTotalGral(valueStorage, 'sodio')}`,
      `${this.getTotalGral(valueStorage, 'zinc')}`,
      `${this.getTotalGral(valueStorage, 'vit_b12')}`
    ];
  }
  getTotalGral(valueStorage, type): number {
    const value =
    this.setTotal(valueStorage, 'desayuno', type) +
    this.setTotal(valueStorage, 'merienda', type) +
    this.setTotal(valueStorage, 'almuerzo', type) +
    this.setTotal(valueStorage, 'te', type) +
    this.setTotal(valueStorage, 'cena', type);
    return Number((value as number).toFixed(2));
  }
  setTotal(valueStorage: any, type: string, property: string) {
    const valueRow = valueStorage[type];
    return sumBy(valueRow, e => Number(e[property]));
  }

  private setFootSubTotal(value, type) {
    const row: any[] = value[type];
    // const sumb = sumBy(row, (o) => o.energia);
    return [
      `Sub total`,
        `${(sumBy(row, (o) => Number(o.cantidad)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.energia)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.humedad)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.proteina)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.grasa)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.hc)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.fibra_cruda)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.ceniza)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.calcio)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.fosforo)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.hierro)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.vit_a)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.tiamina)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.riboflavina)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.niacina)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.vit_c)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.agm)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.agp)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.ags)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.col)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.potasio)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.sodio)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.zinc)) as number).toFixed(2)}`,
        `${(sumBy(row, (o) => Number(o.vit_b12) as number).toFixed(2))}`
    ];
  }
  private setHelearPdf() {
    return [
      'Nombre',
      'Cantidad',
      'Energia',
      'Humedad',
      'Proteina',
      'Grasa',
      'Hc',
      'Fibra cruda',
      'Ceniza',
      'Calcio',
      'Fosforo',
      'Hierro',
      'Vit A',
      'tiamina',
      'Riboflavina',
      'Nianicina',
      'Vit C',
      'Agm',
      'Agp',
      'Ags',
      'Col',
      'Potasio',
      'sodio',
      'Zinc',
      'Vit B12',
    ];
  }
  setRowInput(value, type) {
    const row: any[] = value[type];
    return row.map(e => {
      return [
        `${e.nombre}`,
        `${e.cantidad}`,
        `${e.energia}`,
        `${e.humedad}`,
        `${e.proteina}`,
        `${e.grasa}`,
        `${e.hc}`,
        `${e.fibra_cruda}`,
        `${e.ceniza}`,
        `${e.calcio}`,
        `${e.fosforo}`,
        `${e.hierro}`,
        `${e.vit_a}`,
        `${e.tiamina}`,
        `${e.riboflavina}`,
        `${e.niacina}`,
        `${e.vit_c}`,
        `${e.agm}`,
        `${e.agp}`,
        `${e.ags}`,
        `${e.col}`,
        `${e.potasio}`,
        `${e.sodio}`,
        `${e.zinc}`,
        `${e.vit_b12}`
      ];
    });
  }
  ionViewDidEnter() {
    this.getAllDietas();
  }
  getAllDietas() {
    this.dietas$ = this.dietaService.getAll('composicion');
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
          this.router.navigate(['/composicion/store'], { queryParams: { edit: true, uid: dieta.uid } });
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
            await this.storageService.eliminarDato(dieta.uid, 'composicion');
            this.getAllDietas();
            await this.presentToast(`Eliminado ${dieta.titulo}`);
          }
        }
      ]
    });

    await alert.present();
  }

}
