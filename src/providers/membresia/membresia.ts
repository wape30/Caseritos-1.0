import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference } from '@firebase/database-types';
/*
  Generated class for the MembresiaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MembresiaProvider {

  public membresiasListRef: Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.membresiasListRef = firebase
          .database()
          .ref(`/membresias`);
      }
    });
  }

  // detecta(codigo): void {
  //   getMembresiaDetail(codigo)
  // }

  getMembresiasList(): Reference {
    return this.membresiasListRef;
  }

  getMembresiaDetail(eventId: string): Reference {
    return this.membresiasListRef.child(eventId);
  }



}
