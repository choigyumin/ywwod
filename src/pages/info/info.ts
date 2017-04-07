import { Component } from '@angular/core';
import { InAppBrowser } from 'ionic-native';
import { Nav, NavController, Platform } from 'ionic-angular';
import { User,Auth } from '@ionic/cloud-angular';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class Info {
  constructor(public nav: Nav, public navCtrl: NavController, public user:User, public auth:Auth, public platform:Platform) {
  }
  
  changePw() {
        this.platform.ready().then(() => {
            new InAppBrowser(this.auth.passwordResetUrl, "_system");
        });
  }

}