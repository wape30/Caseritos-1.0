import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference } from '@firebase/database-types';
/*
  Generated class for the ContadoresProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContadoresProvider {

public contadorPedidos: Reference;

  constructor( ) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.contadorPedidos = firebase
          .database()
          .ref(`/contador`);
      }
    });
  }

  getContadoresList(): Reference {
    return this.contadorPedidos;
  }

  getContadoresNodo(eventId: string): Reference {
    return this.contadorPedidos.child(eventId);
  }

  reiniciaContador(general: number){
    return this.contadorPedidos.update({general});
  }

  updateHoraCierre(horaCierre){
    return this.contadorPedidos.update({horaCierre});
  }

  updateValorDomi(precioDomi){
    return this.contadorPedidos.update({precioDomi});
  }

  updateContador(cantidad: any): Promise<any> {
    return this.contadorPedidos.child('general').transaction(function(almuerzos) {
      return almuerzos + cantidad;
    });
  }

}
