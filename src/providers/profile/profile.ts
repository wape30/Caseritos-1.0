//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User, AuthCredential } from '@firebase/auth-types';
import { Reference } from '@firebase/database-types';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  public userProfile: Reference;
  public workersList: Reference;
  public usersList  : Reference;
  public almuerzosRef: Reference;
  public currentUser: User;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if(user)  {
      this.currentUser = user;
      this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
      this.almuerzosRef = firebase.database().ref(`/userProfile/${user.uid}/almuerzos`);
      this.workersList = firebase.database().ref(`/workerProfile`);
      this.usersList = firebase.database().ref(`/userProfile`);
      }
    });
  }

  getWorkersList(): Reference {
    return this.workersList;
  }

  respondeJedionda(){
    console.log('sos una jedionda')
  }

  getUsersList(): Reference {
    return this.usersList;
  }

  getUserProfile(): Reference {
    return this.userProfile;
  }

  addCarrito(
    evento: any,
    dir: string,
    nota: string,
    wasap: number,
    idUser: string,
    nombreUser: string,
    //zona: string
  ) : PromiseLike<any> {
    return this.userProfile.child('carrito').push({
      nombrePlato: evento.nombre,
      nombreUser: nombreUser,
      imagen: evento.imagen,
      direccion: dir,
      nota: nota,
      celular: wasap,
      idUser: idUser,
      estado: 'En preparación',
      opcion: evento.opcion,
      //zona: zona,
      precio: evento.precio
    })
  }

  updateTipoMembresia(membresia: string): Promise<any> {
    return this.userProfile.update({ membresia });
  }

  updateToken(token: string): Promise<any> {
    return this.userProfile.update({ token });
  }

  updateCantidad(cantidad: any): Promise<any> {
    return this.almuerzosRef.transaction(function(almuerzos) {
      return almuerzos + cantidad;
    });
  }

  updateZona(zona: string): Promise<any> {
    return this.userProfile.update({ zona });
  }

  updateCelular(celular: number): Promise<any> {
    return this.userProfile.update({ celular });
  }

  updateName(firstName: string, lastName: string): Promise<any> {
    return this.userProfile.update({ firstName, lastName });
  }

  updateAddress(direccion: string, detalleDireccion: string): Promise<any> {
    return this.userProfile.update({ direccion, detalleDireccion });
  }

  anadirDireccion(direccion: string, detalleDireccion: string, zona: string): PromiseLike<any> {
    return this.userProfile.child('direcciones').push({ direccion, detalleDireccion, zona });
  }

  updateNotas(nota: string): Promise<any> {
    return this.userProfile.update({ nota });
  }

  updateDOB(birthDate: string): Promise<any> {
    return this.userProfile.update({ birthDate });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );
    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updateEmail(newEmail).then(user => {
          this.userProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  borrarCuenta(oldPassword: string): Promise<any> {
    this.userProfile.remove();
    const credential: AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.delete().then(function() {
          console.log('Usuario eliminado');
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          console.log('Password Changed');
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}
