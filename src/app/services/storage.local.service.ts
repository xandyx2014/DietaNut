import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) { }

  guardarDatos<T>({dato, referencia}: {dato: T, referencia: string}) {
    return new Promise( ( resolve, reject ) => {
      this.storage.get(referencia).then((resp) => {
        if (resp === null || resp === undefined) {
          this.storage.set(referencia, [dato]).then(() => {
            resolve();
          });
        } else {
          this.verificarDato({dato, referencia}).then( () => {
            resolve();
          } );
        }
      });
    } );
  }
  obtenerDatos<T>(referencia): Promise<T> {
    return this.storage.get(referencia);
  }
  private verificarDato({dato, referencia}) {
    return new Promise( ( resolve, reject ) => {
      this.storage.get(referencia).then((resp: any[]) => {
        const existeItem = resp.find( item => item.uid === dato.uid);
        if (existeItem === undefined) {
         resp.push(dato);
         this.storage.set(referencia, resp).then( ( ) => {
           resolve();
         } );
        }
     });
    } );
  }
  eliminarDato(uid, referencia) {
    return new Promise( ( resolve, reject ) => {
      this.storage.get(referencia).then((resp: any[]) => {
        resp = resp.filter( item => item.uid !== uid);
        if (resp.length === 0) {
          resp = null;
        }
        this.storage.set(referencia, resp).then( () => {
          resolve();
        });
      });
    } );
  }
  actualizarDato(uid, dato, referencia) {
    return new Promise( ( resolve, reject ) => {
      this.storage.get(referencia).then( (resp: any[]) => {
        resp.map( (item, i) => {
          if (item.uid === uid) {
            resp[i] = {...dato};
            this.storage.set(referencia, resp).then(() => {
              resolve();
            });
          }
        });
      });
    });
  }
}
