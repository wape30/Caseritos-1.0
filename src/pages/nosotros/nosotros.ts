import { Component } from '@angular/core';
import { NavController, AlertController, Platform, IonicPage, NavParams  } from 'ionic-angular';
import { ImagenesProvider } from '../../providers/imagenes/imagenes';
import { storage, initializeApp } from 'firebase';
/**
 * Generated class for the NosotrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nosotros',
  templateUrl: 'nosotros.html',
})
export class NosotrosPage {

  public imageListNosotros: Array<any>;

  constructor(
    public navCtrl: NavController,
    public imagenesProvider: ImagenesProvider,
    public alertCtrl: AlertController,
    public platform: Platform,
    public navParams: NavParams
  ) {  }

  ionViewDidLoad() {
    this.imagenesProvider.getImagenesSpecificList('nosotros').on('value', eventListSnapshot => {
      this.imageListNosotros = [];
      eventListSnapshot.forEach(snap => {
        this.imageListNosotros.push({
            id: snap.key,
            nombre: snap.val().nombre,
            imagen: snap.val().imagen,
            tipo: 'nosotros'
        });
        return false;
      });
      //this.platosList = platosList;
      //this.loadedPlatosList = this.platosList;
    });
  }

}
