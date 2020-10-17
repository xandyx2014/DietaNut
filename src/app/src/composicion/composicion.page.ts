import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DietaService } from 'src/app/services/dieta.service';

@Component({
  selector: 'app-composicion',
  templateUrl: './composicion.page.html',
  styleUrls: ['./composicion.page.scss'],
})
export class ComposicionPage implements OnInit {
  public dietas$: Observable<any[]>;
  constructor(
    private dietaService: DietaService,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.getAllDietas();
  }
  getAllDietas() {
    this.dietas$ = this.dietaService.getAll('composicion');
  }
  async presentActionSheet(dieta: any) {
    const actionSheet = await this.actionSheetController.create({
      header: dieta.titulo,
      mode: 'md',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
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

}
