import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compocision } from '../model/alimento.composicion.model';

@Injectable({
  providedIn: 'root'
})
export class ComposicionAlimentoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Compocision> {
    return this.http.get<Compocision>('assets/data/composicion.quimica.alimento.json');
  }

}
