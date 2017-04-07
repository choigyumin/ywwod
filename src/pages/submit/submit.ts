import { Component } from '@angular/core';

import { Nav, NavController, AlertController, ToastController, Events } from 'ionic-angular';

import { User,Auth } from '@ionic/cloud-angular';
import { Statistics } from '../statistics/statistics';
import { WodProvider } from '../../providers/wod-provider'
import 'rxjs/add/operator/debounceTime';

import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-submit',
  templateUrl: 'submit.html'
})
export class Submit {
  submit = {
                kind:'', 
                wod:'', 
                record:'', 
                memo:'',
                date:''
           };

  public color: string = 'primary';
  public position: string = 'right';
  public icon: string = 'more';
  public enableBackdropDismiss: boolean = false;
  public buttonColor: string = 'dark';
  
  constructor(public nav:Nav, public navCtrl: NavController, private alertCtrl: AlertController, public toastCtrl: ToastController, public events:Events, public user:User, public auth:Auth, public dataService: WodProvider, public af: AngularFire) {
      this.wods = af.database.list('/wods');
  }

  public wods: FirebaseListObservable<any>;
  

  doSubmit(form) {
      if (form.valid) {
          //using user's custom data
          //instead of database
          /*
          this.db.collection("users").upsert({
              id:this.user.id,
              WOD:this.submit
          });
          */
          this.nav.setRoot(Statistics);
      }
  }
  public buttons =  [
      {
        icon: 'color-wand',
        title: 'Color',
        color: this.buttonColor,
        handler: ()=> {
          this.presentToast('Dont close on click');
          return false;
        }
      },
      {
        icon: 'contrast', 
        title: 'Contrast',
        color: this.buttonColor,
        handler: ()=> {
          this.presentToast('Close on click');
        }
      },
      {
        icon: 'crop',
        title: 'Crop',
        color: this.buttonColor,
        handler: ()=> {
          this.presentToast('Dont close on click');
          return false;
        }
      }
    ];
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

}
