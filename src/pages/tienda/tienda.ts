import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Alert,
  AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ProfileProvider } from '../../providers/profile/profile';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';
import { PlatosControllerProvider } from '../../providers/platos-controller/platos-controller';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { CarritoPage } from '../carrito/carrito';
import { Firebase } from '@ionic-native/firebase';

/**
 * Generated class for the TiendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tienda',
  templateUrl: 'tienda.html',
})
export class TiendaPage {

  public userProfile: any;
  public platosList: Array<any>;

  constructor(
    private socialSharing: SocialSharing,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public profileProvider: ProfileProvider,
    public pedidosProvider: PedidosProvider,
    public PlatosControllerProvider: PlatosControllerProvider,
    public firebase: Firebase

  ) { }

  ionViewDidLoad() {

    // let alert = this.alertCtrl.create({
    //   title: 'Bienvenido a Fit Lunch!',
    //   subTitle: 'Visita www.fitlunch.co',
    //   //buttons: ['OK']
    //   buttons: ['OK'
    //     // {
    //     //   text: 'OK',
    //     //   //icon: !this.platform.is('ios') ? 'power' : null,
    //     //   handler: () => {
    //     //     //this.funcionjedionda();
    //     //   }
    //     // }
    //   ]
    // });
    // alert.present();
    setTimeout(()=>{
    //  alert.dismiss();
      // this.imagenesProvider.getImagenesSpecificList('inicio').on('value', eventListSnapshot => {
      //   this.imageListInicio = [];
      //   eventListSnapshot.forEach(snap => {
      //
      //     return false;
      //   })
      // })
      this.verTienda();
      //this.borraViejo();
    }, 1000);

  }

  // borraViejo() {
  //   this.profileProvider.getUserProfile().once('value', snaper=> {
  //     console.log(snaper.val().email);
  //     this.profileProvider.getUsersList().once('value', usersSnapshot=> {
  //       usersSnapshot.forEach(snap => {
  //         if(snaper.val().email == snap.val().email) {
  //           console.log(snap.val());
  //           snap.val().remove()
  //         }
  //         return false;
  //       })
  //     })
  //   })
  // }

  verTienda() {

    this.firebase.getToken()
      .then(token =>

        this.profileProvider.updateToken(token)
      ) // save the token server-side and use it to push notifications to this device
      .catch(error => console.error('Error getting token', error));

    this.PlatosControllerProvider.getPlatosList().orderByChild("estado").equalTo('enVenta').on('value', eventListSnapshot => {
      this.platosList = [];
      eventListSnapshot.forEach(snap => {
        this.platosList.push({
            id: snap.key,
            nombre: snap.val().nombre,
            descripcion: snap.val().descripcion,
            imagen: snap.val().imagen,
            opcion: snap.val().opcion,
            zona: snap.val().zona,
            precio: snap.val().precio,
            //color: snap.val().color,
        });
        return false;
      });
    });

    this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      //console.log(this.userProfile)
    });

  }


  alCarrito(){
    this.navCtrl.push(CarritoPage)
  }

  esPremium() {
    let alert = this.alertCtrl.create({
      title: 'Plato Premium',
      subTitle: 'El plato que escogiste es Premium, recuerda que solo se paga en efectivo',
      buttons: ['OK']
    });
    alert.present();
  }


  addCarrito(evento){

    //console.log(evento);
    if(evento.opcion == 'Premium') {
      setTimeout(()=>this.esPremium(), 1000);
    }
    // this.profileProvider.getUserProfile().once('value', userProfileSnapshot => {
    //   console.log('jedionda')
    //
    //   });
    this.profileProvider.getUserProfile().once('value', userProfileSnapshot => {
    console.log(userProfileSnapshot.val())
    if(userProfileSnapshot.val().firstName == undefined ||
       userProfileSnapshot.val().lastName ==undefined ||
       userProfileSnapshot.val().celular ==undefined ) {
       //userProfileSnapshot.val().zona ==undefined ||
       //userProfileSnapshot.val().direccion ==undefined) {
         let alert = this.alertCtrl.create({
           title: 'Oops...!',
           subTitle: 'Nos faltan algunos datos, por favor llena tu perfil con nombre completo, dirección, un celular y tu zona de la ciudad.',
           buttons: ['OK']
         });
         alert.present();
         return false;
       }
      var dir = userProfileSnapshot.val().direccion + ' ' + userProfileSnapshot.val().detalleDireccion;
      //var nota = userProfileSnapshot.val().nota;
      var wasap = userProfileSnapshot.val().celular;
      var nombreUser = userProfileSnapshot.val().firstName + ' ' + userProfileSnapshot.val().lastName;
      var idUser = userProfileSnapshot.key;
      var zona = userProfileSnapshot.val().zona;
      let alert = this.alertCtrl.create({
        title: 'Añadiendo al carrito',
        subTitle: 'Escoge una bebida',
        inputs: [
          {
            type: 'radio',
            label: 'Té',
            value: 'Te',
            checked: true
          },
          {
            type: 'radio',
            label: 'Jugo (+$1.000)',
            value: 'Jugo (+$1.000)',
            checked: false
          }
          // {
          //   name: 'nota',
          //   placeholder: 'Escribe tu sugerencia al cheff',
          //   value: this.userProfile.nota
          // }
        ],
        buttons: [
          { text: 'Cancelar' },
          {
            text: 'Añadir',
            handler: data => {
              //console.log('añadido')

              //this.profileProvider.updateCantidad(-1);
              this.alertaAñadido();
              this.profileProvider.addCarrito(evento,dir,data,wasap,idUser, nombreUser);
            }
          }
        ]
      });
      alert.present();
    });
  }

  alertaAñadido() {
    let alert = this.alertCtrl.create({
      title: 'Listo!',
      subTitle: 'Ha sido añadido al carrito!',
      buttons: ['OK']
    });
    alert.present();
  }

  // pedirPlato(evento): void {
  //   //console.log(evento)
  //   var d = new Date();
  //   var hora = d.getHours();
  //   this.profileProvider.getUserProfile().once('value', userProfileSnapshot => {
  //     var dir = userProfileSnapshot.val().direccion;
  //     //var nota = userProfileSnapshot.val().nota;
  //     var wasap = userProfileSnapshot.val().celular;
  //     var nombreUser = userProfileSnapshot.val().firstName + ' ' + userProfileSnapshot.val().lastName;
  //     var idUser = userProfileSnapshot.key;
  //     var zona = userProfileSnapshot.val().zona;
  //     if(hora >= 10) {
  //      let alert = this.alertCtrl.create({
  //        title: 'Muy tarde!',
  //        subTitle: 'Debes hacer tu pedido antes de las 10 am!',
  //        buttons: ['OK']
  //      });
  //      alert.present();
  //    } else if(userProfileSnapshot.val().firstName =="" ||
  //        userProfileSnapshot.val().lastName =="" ||
  //        userProfileSnapshot.val().celular =="" ||
  //        userProfileSnapshot.val().zona =="" ||
  //        userProfileSnapshot.val().direccion =="") {
  //          let alert = this.alertCtrl.create({
  //            title: 'Oops...!',
  //            subTitle: 'Nos faltan algunos datos, por favor llena tu perfil con nombre completo, dirección, un celular y tu zona de la ciudad.',
  //            buttons: ['OK']
  //          });
  //          alert.present();
  //        } else if(userProfileSnapshot.val().almuerzos == 0) {
  //          let alert = this.alertCtrl.create({
  //            title: 'Sin almuerzos en tu membresía',
  //            subTitle: 'Pagas cuando llegue el domicilio',
  //            inputs: [
  //              {
  //                name: 'nota',
  //                placeholder: 'Escribe tu sugerencia al cheff',
  //                value: this.userProfile.nota
  //              }
  //            ],
  //
  //            buttons: [
  //              { text: 'Cancelar' },
  //              {
  //                text: 'Pedir',
  //                handler: data => {
  //                  //this.profileProvider.updateCantidad(-1);
  //                  this.pedidosProvider.createPedido(evento,dir,data.nota,wasap,idUser, nombreUser, 'Contra Entrega',zona);
  //                }
  //              }
  //            ]
  //          });
  //          alert.present();
  //        } else {
  //
  //          const alert: Alert = this.alertCtrl.create({
  //            title:'Confirmar pedido',
  //            message: 'Se descontará un (1) almuerzo de tu perfil',
  //            inputs: [
  //              {
  //                name: 'nota',
  //                placeholder: 'Escribe tu sugerencia al cheff',
  //                value: this.userProfile.nota
  //              }
  //            ],
  //            buttons: [
  //              { text: 'Cancelar' },
  //              {
  //                text: 'Pedir',
  //                handler: data => {
  //                  this.profileProvider.updateCantidad(-1);
  //                  this.pedidosProvider.createPedido(evento,dir,data.nota,wasap,idUser, nombreUser, 'Con Membresía',zona);
  //                }
  //              }
  //            ]
  //          });
  //          alert.present();
  //        }
  //   })
  // }

  // facebookShare() {
  //   this.socialSharing.shareViaFacebook("Fit Lunch es lo maximo", null, null).then(() => {
  //     console.log("shareViaFacebook: Success");
  //   }).catch(() => {
  //     console.error("shareViaFacebook: failed");
  //   });
  // }
  // instagramShare() {
  //   this.socialSharing.shareViaInstagram("Fit Lunch es lo maximo", null).then(() => {
  //     console.log("shareViaFacebook: Success");
  //   }).catch(() => {
  //     console.error("shareViaFacebook: failed");
  //   });
  // }
  // twitterShare() {
  //   this.socialSharing.shareViaTwitter("Fit Lunch es lo maximo", null, null).then(() => {
  //     console.log("shareViaFacebook: Success");
  //   }).catch(() => {
  //     console.error("shareViaFacebook: failed");
  //   });
  // }

  // notaPedido(): void {
  //   const alert: Alert = this.alertCtrl.create({
  //     title:'Notas al cheff',
  //     message: '¿Alguna sugerencia para tu pedido?',
  //     inputs: [
  //       {
  //         name: 'nota',
  //         placeholder: 'Escribe tu sugerencia',
  //         value: this.userProfile.nota
  //       }
  //     ],
  //     buttons: [
  //       { text: 'Cancelar' },
  //       {
  //         text: 'Guardar',
  //         handler: data => {
  //           this.profileProvider.updateNotas( data.nota );
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }


}
