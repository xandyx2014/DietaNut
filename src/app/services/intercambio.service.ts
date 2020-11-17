import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';
import { Intercambio } from '../model/intercambio.model';

@Injectable({
  providedIn: 'root'
})
export class IntercambioService {
  constructor(
    private http: HttpClient) { }

  private getAll(): Observable<Intercambio[]> {
    return this.http.get<Intercambio[]>('assets/data/intercambio.json');
  }
  searchByGrupo(grupo: string | number) {
    return this.getAll().pipe(
      map(arr => arr.filter(e => e.grupo === grupo)[0]),
      debounceTime(500),
      take(1)
    );
  }
}
