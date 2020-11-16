import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, take } from 'rxjs/operators';
import { Racion } from '../model/racion.model';

@Injectable({
  providedIn: 'root'
})
export class RacionService {
  constructor(private http: HttpClient) { }

  private getAll(): Observable<Racion[]> {
    return this.http.get<Racion[]>('assets/data/raciones.json');
  }
  searchByCaloria(caloria: string | number) {
    return this.getAll().pipe(
      map(arr => arr.filter(e => e.calorias === caloria)[0]),
      map( e => {
        if (typeof e === 'undefined') {
          const racion: Racion = {
            azucarados: '',
            calorias: '',
            carne: '',
            cereales: '',
            frutas: '',
            grasas: '',
            leche: '',
            verduras: ''
          };
          return racion;
        }
        return e;
      }),
      debounceTime(500),
      take(1)
    );
  }
}
