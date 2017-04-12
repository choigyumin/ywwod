import { Component } from '@angular/core';
import { InAppBrowser } from 'ionic-native';
import { Nav, NavController, Platform, AlertController } from 'ionic-angular';
import { User,Auth } from '@ionic/cloud-angular';
import { AuthPage } from '../auth/auth'


@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class Info {
  constructor(public nav: Nav, public navCtrl: NavController, public user:User, public auth:Auth, public platform:Platform, public alertCtrl:AlertController) {
  }
  
  changePw() {
        this.platform.ready().then(() => {
            new InAppBrowser(this.auth.passwordResetUrl, "_system");
        });
  }

  changeBox() { 
    let prompt = this.alertCtrl.create({
    title: 'Box Name',
    message: "Enter your box's name",
    inputs: [
      {
        name: 'box',
        placeholder: 'Box'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.user.set('box', data.box)
        }
      }
    ]
  });
  prompt.present();
  }
  logOut() {
      this.auth.logout();
      this.nav.setRoot(AuthPage);
  }
}