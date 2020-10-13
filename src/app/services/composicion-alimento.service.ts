import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compocision } from '../model/alimento.composicion.model';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ComposicionAlimentoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Compocision[]> {
    return this.http.get<Compocision[]>('assets/data/composicion.quimica.alimento.json');
  }
  searchByName(name: string) {
    return this.getAll().pipe(
      map(arr => arr.filter(e => e.nombre === name)[0]),
      take(1)
    );
  }

}
