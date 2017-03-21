import { Component } from '@angular/core';

import { Nav, NavController, AlertController, ToastController, Events } from 'ionic-angular';

import { Database, User,Auth } from '@ionic/cloud-angular';
import { Statistics } from '../statistics/statistics';

@Component({
  selector: 'page-submit',
  templateUrl: 'submit.html'
})
export class Submit {
  submit = {
                box:'', 
                wod:'', 
                record:'', 
                memo:'',
                date:''
           };
  
  //TODO: 모든페이지에 MORE 토스트버튼 추가
  public color: string = 'primary';
  public position: string = 'right';
  public icon: string = 'more';
  public enableBackdropDismiss: boolean = false;
  public buttonColor: string = 'dark';
  constructor(public nav:Nav, public navCtrl: NavController, private alertCtrl: AlertController, public toastCtrl: ToastController, public events:Events, public db:Database, public user:User, public auth:Auth) {
      this.db.connect();
  }

  doSubmit(form) {
      if (form.valid) {
          this.db.collection("users").upsert({
              id:this.user.id,
              WOD:this.submit
          });
          this.db.collection("users")
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
