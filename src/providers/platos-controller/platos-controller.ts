import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';

/*
  Generated class for the PlatosControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlatosControllerProvider {
  public platosListRef: Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.platosListRef = firebase
          .database()
          .ref(`/platos`);
      }
    });
  }
  getPlatosList(): Reference {
    return this.platosListRef;
  }

  getPlatoDetail(eventId: string): Reference {
    return this.platosListRef.child(eventId);
  }


}
