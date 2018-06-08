import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference } from '@firebase/database-types';

/*
  Generated class for the ImagenesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImagenesProvider {

  public imagenesListRef: Reference;

  constructor( ) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.imagenesListRef = firebase
          .database()
          .ref(`/imagenes`);
      }
    });
  }

  getImagenesList(): Reference {
    return this.imagenesListRef;
  }

  getImagenesSpecificList(eventId: string): Reference {
    return this.imagenesListRef.child(eventId);
  }

}
