import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, take } from 'rxjs/operators';
import { Racion } from '../model/racion.model';

@Injectable({
  providedIn: 'root'
})
export class RacionService {
  constructor(
    private http: HttpClient,
    private toastController: ToastController) { }

  private getAll(): Observable<Racion[]> {
    return this.http.get<Racion[]>('assets/data/raciones.json');
  }
  searchByCaloria(caloria: string | number) {
    return this.getAll().pipe(
      map(arr => arr.filter(e => e.calorias === caloria)[0]),
      map( (e) => {
        if (typeof e === 'undefined') {
          const racion: Racion = {
            azucarados: '0',
            calorias: '0',
            carne: '0',
            cereales: '0',
            frutas: '0',
            grasas: '0',
            leche: '0',
            verduras: '0'
          };
          return racion;
        }
        this.toastController.create({
          message: 'Valor encontrado, se ha autocompletado la tabla.',
          mode: 'md',
          duration: 2500
        }).then( toast => {
          toast.present();
        });
        return e;
      }),
      debounceTime(500),
      take(1)
    );
  }
}
