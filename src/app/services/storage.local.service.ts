import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(private storage: Storage) {}

  guardarDatos<T>({ dato, referencia }: { dato: T; referencia: string }) {
    return new Promise((resolve, reject) => {
      this.storage.get(referencia).then((resp) => {
        if (resp === null || resp === undefined) {
          this.storage.set(referencia, [dato]).then(() => {
            resolve(null);
          });
        } else {
          this.verificarDato({ dato, referencia }).then(() => {
            resolve(null);
          });
        }
      });
    });
  }
  async obtenerDatos<T>(referencia) {
    const dataStorage = await this.storage.get(referencia);
    const valueStorage = dataStorage ?? [];
    return valueStorage;
  }
  async buscarPorUid<T>(referencia, uid): Promise<T> {
    const dataStorage = await this.storage.get(referencia);
    const valueStorage: any[] = dataStorage ?? [];
    return valueStorage.find((e) => e.uid === uid);
  }
  private verificarDato({ dato, referencia }) {
    return new Promise((resolve, reject) => {
      this.storage.get(referencia).then((resp: any[]) => {
        const existeItem = resp.find((item) => item.uid === dato.uid);
        if (existeItem === undefined) {
          resp.push(dato);
          this.storage.set(referencia, resp).then(() => {
            resolve(null);
          });
        }
      });
    });
  }
  eliminarDato(uid, referencia) {
    return new Promise((resolve, reject) => {
      this.storage.get(referencia).then((resp: any[]) => {
        resp = resp.filter((item) => item.uid !== uid);
        if (resp.length === 0) {
          resp = null;
        }
        this.storage.set(referencia, resp).then(() => {
          resolve(null);
        });
      });
    });
  }
  async actualizarDato(uid, dato, referencia) {
    await this.eliminarDato(uid, referencia);
    await this.guardarDatos({
      dato,
      referencia,
    });
  }
}
