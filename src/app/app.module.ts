import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { Firebase } from '@ionic-native/firebase';
// import { AngularFireModule } from 'angularfire2';
// import { FCM } from '@ionic-native/fcm';
//import firebase from 'firebase';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { SocialSharing } from '@ionic-native/social-sharing';
// import { Http } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PerfilPage } from '../pages/perfil/perfil';
import { TiendaPage } from '../pages/tienda/tienda';
import { OrdenesPage } from '../pages/ordenes/ordenes';
import { NosotrosPage } from '../pages/nosotros/nosotros';
import { CarritoPage } from '../pages/carrito/carrito';
import { AuthProvider } from '../providers/auth/auth';
import { EventProvider } from '../providers/event/event';
import { ProfileProvider } from '../providers/profile/profile';
import { PlatosControllerProvider } from '../providers/platos-controller/platos-controller';
import { MembresiaProvider } from '../providers/membresia/membresia';
import { PedidosProvider } from '../providers/pedidos/pedidos';
import { ImagenesProvider } from '../providers/imagenes/imagenes';
import { FiadosProvider } from '../providers/fiados/fiados';
import { ContadoresProvider } from '../providers/contadores/contadores';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PerfilPage,
    TiendaPage,
    OrdenesPage,
    NosotrosPage,
    CarritoPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PerfilPage,
    TiendaPage,
    OrdenesPage,
    NosotrosPage,
    CarritoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NgxQRCodeModule,
    AuthProvider,
    EventProvider,
    ProfileProvider,
    SocialSharing,
    PlatosControllerProvider,
    MembresiaProvider,
    PedidosProvider,
    // FCM,
    Firebase,
    GooglePlus,
    ImagenesProvider,
    FiadosProvider,
    ContadoresProvider,
  ]
})
export class AppModule {}
