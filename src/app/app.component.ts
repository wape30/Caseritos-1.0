import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { FCM } from '@ionic-native/fcm';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { TiendaPage } from '../pages/tienda/tienda';
import { OrdenesPage } from '../pages/ordenes/ordenes';
import { NosotrosPage } from '../pages/nosotros/nosotros';
import { CarritoPage } from '../pages/carrito/carrito';
import{firebaseConfig}from'./credentials';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') content: Nav;
  public rootPage:any;

  public pages: Array<{titulo: string, component: any, icon: string }>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    ) {
    firebase.initializeApp(firebaseConfig);
    this.rootPage=TiendaPage;
    this.pages = [
      { titulo: 'Inicio',    component:HomePage,     icon: 'star' },
      { titulo: 'Mi Perfil', component:PerfilPage,   icon: 'person' },
      { titulo: 'Tienda',    component:TiendaPage,   icon: 'basket' },
      { titulo: 'Carrito',    component:CarritoPage,   icon: 'cart' },
      { titulo: 'Ordenes',   component:OrdenesPage,  icon: 'flame' },
      { titulo: 'Nosotros',  component:NosotrosPage, icon: 'information-circle' }
    ];
    const unsuscribe = firebase.auth().onAuthStateChanged(user=> {
      if(!user) {
        this.rootPage = 'LoginPage';
      } else {
        this.rootPage = TiendaPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }
  goToPage(page){
    this.content.setRoot(page);
  }
}
