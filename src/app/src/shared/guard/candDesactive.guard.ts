import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ComponentCanDeactivate {
    canDeactivate(): boolean | Observable<boolean>;
}

export const CanDeactivateState = {
    defendAgainstBrowserBackButton: false,
};
@Injectable({
    providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
    constructor(readonly alertController: AlertController) {}
    canDeactivate(
        component: ComponentCanDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate() ||  from(this.presentAlertConfirm());
    }
    presentAlertConfirm(): Promise<boolean> {
        return new Promise( (resolve, reject) => {
            this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Confirmar!',
                message: 'Estas seguro de <strong>Salir</strong>!!!',
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => resolve(false)
                  }, {
                    text: 'Aceptar',
                    handler: () => resolve(true)
                  }
                ]
              }).then(alert => {
                  alert.present();
              });
        });
    }
}