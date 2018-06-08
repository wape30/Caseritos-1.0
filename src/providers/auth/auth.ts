//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
//import { ProfileProvider } from '../profile/profile';
import firebase from 'firebase';
// import { FCM } from '@ionic-native/fcm';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(
    public googleplus: GooglePlus,
    //public profileProvider: ProfileProvider,
    // public afAuth: AngularFireAuth,
    // public afDatabase: AngularFireDatabase,
    // public fcm: FCM
  ) {}

  loginUser(email:string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email:string, password:string): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(newUser => {
      //this.fcm.getToken().then(token=>{
        firebase.database().ref(`/userProfile/${newUser.uid}/email`).set(email);

        //setTimeout(this.borraViejo, 1000, email);
        //this.profileProvider.respondeJedionda();
        //firebase.database().ref(`/userProfile/${newUser.uid}/membresia`).set('REGULAR');
        //firebase.database().ref(`/userProfile/${newUser.uid}/almuerzos`).set(0);
        //firebase.database().ref(`/userProfile/${newUser.uid}/token`).set(token);
        //console.log(token)
      //})

    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    });
  }



  loginGoogle(){
    //console.log('jedionda')
    this.googleplus.login({
      'webClientId':'1047334742952-u8flufmbbd1vim92e4mjglv4lkcidt36.apps.googleusercontent.com',
      'offline':true
    }).then(res=> {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
      .then(newUser=>{
        //console.log()
        firebase.database().ref(`/userProfile/${newUser.uid}/email`).set(newUser.email);
        //firebase.database().ref(`/userProfile/${newUser.uid}/membresia`).set('REGULAR');
        //firebase.database().ref(`/userProfile/${newUser.uid}/almuerzos`).set(0);
        console.log('epaa');
      }).catch(ns=>{
        console.log('nope')
      })
    })
  }

  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
  }

}
