import { Injectable } from '@angular/core';
import { StorageService } from './storage.local.service';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DietaService {

  constructor(
    private storageService: StorageService
  ) { }

  getAll(reference: string): Observable<any> {
    return from(this.storageService.obtenerDatos(reference)).pipe();
  }
}
