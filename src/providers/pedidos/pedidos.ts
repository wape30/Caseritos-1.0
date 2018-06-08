import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference } from '@firebase/database-types';
/*
  Generated class for the PedidosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PedidosProvider {

  public pedidosListRef: Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.pedidosListRef = firebase
          .database()
          .ref(`/pedidos`);
      }
    });
  }
  getPedidosList(): Reference {
    return this.pedidosListRef;
  }

  getPedidosDetail(eventId: string): Reference {
    return this.pedidosListRef.child(eventId);
  }

  createPedido(
    idUser: string,
    nombreUser: string,
    nombrePlato: string,
    celular: number,
    imagen: string,
    nota: string,
    estado: string,
    opcion: string,
    pago: string,
    precio: number,
    zona: string,
    direccion: string,
    tipoMembresia: string,
    fecha: string,
    //color: string,
  ) : PromiseLike<any> {
    return this.pedidosListRef.push({
      idUser:      idUser,
      nombreUser:  nombreUser,
      nombrePlato: nombrePlato,
      celular:     celular,
      imagen:      imagen,
      nota:        nota,
      estado:      estado,
      opcion:      opcion,
      pago:        pago,
      precio:      precio,
      zona:        zona,
      direccion:   direccion,
      tipoMembresia: tipoMembresia,
      fecha:        fecha,
      color: 'danger',
    })
  }

}
