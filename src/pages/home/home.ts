import { Component } from '@angular/core';
import { NavController, AlertController, Platform  } from 'ionic-angular';
import { ImagenesProvider } from '../../providers/imagenes/imagenes';
import { storage, initializeApp } from 'firebase';

// import { PerfilPage } from '../perfil/perfil';
// import { TiendaPage } from '../tienda/tienda';
// import { OrdenesPage } from '../ordenes/ordenes';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public imageListInicio: Array<any>;

  constructor(
    public navCtrl: NavController,
    public imagenesProvider: ImagenesProvider,
    public alertCtrl: AlertController,
    public platform: Platform,

    ) {  }

  ionViewDidLoad() {
    //this.funcionjedionda();
    // let alert = this.alertCtrl.create({
    //   title: 'Bienvenido a Fit Lunch!',
    //   subTitle: 'Visita www.fitlunch.co',
    //   //buttons: ['OK']
    //   buttons: [
    //     {
    //       text: 'OK',
    //       //icon: !this.platform.is('ios') ? 'power' : null,
    //       handler: () => {
    //         //this.funcionjedionda();
    //       }
    //     }
    //   ]
    // });
    // alert.present();
    // setTimeout(()=>{
    //   alert.dismiss();
    //   this.imagenesProvider.getImagenesSpecificList('inicio').on('value', eventListSnapshot => {
    //     this.imageListInicio = [];
    //     eventListSnapshot.forEach(snap => {
    //
    //       return false;
    //     })
    //   })
       this.cargaImagenes();
    // }, 1500);
  }


   cargaImagenes() {
//     console.log('jedionda mayor')
     this.imagenesProvider.getImagenesSpecificList('inicio').on('value', eventListSnapshot => {
       this.imageListInicio = [];
       eventListSnapshot.forEach(snap => {
         this.imageListInicio.push({
             id: snap.key,
             nombre: snap.val().nombre,
             imagen: snap.val().imagen,
             tipo: 'inicio'
         });
         return false;
       });
       //this.platosList = platosList;
       //this.loadedPlatosList = this.platosList;
     });
   }

}
