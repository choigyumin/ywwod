import { Component } from '@angular/core';
import { Nav, NavController, NavParams, Events } from 'ionic-angular';
import { Auth } from '@ionic/cloud-angular';

import { Submit } from '../submit/submit';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  login = {email: '', password: ''};
  submitted:boolean = false;
  constructor(public nav: Nav, public navCtrl: NavController, public navParams: NavParams, public events: Events, public auth: Auth ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  doLogin(form) {
        this.submitted = true;
        if (form.valid) {
            this.auth.login('basic', this.login ).then( () => {
                this.events.publish('user:logged_in');
                this.nav.setRoot(Submit);
            }, () => {
                alert('Login failed.');
            });      
        }
  }

}
