import { Component } from '@angular/core';
import { Nav, NavController, NavParams, Events } from 'ionic-angular';
import { Auth, IDetailedError } from '@ionic/cloud-angular';

import { Submit } from '../submit/submit';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})


export class SignupPage {
    
  signup = {email: '', password: ''};
  submitted:boolean = false;

  constructor(public nav: Nav, public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public events: Events) {
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
    
  doSignup(form) {
      this.submitted = true;
      if (form.valid) {
          this.auth.signup(this.signup).then(() => {
              this.auth.login('basic', this.signup).then( () => {
                this.events.publish('user:logged_in');
                this.nav.setRoot(Submit);
              });
          }, (err: IDetailedError<string[]>) => {
              for (let e of err.details) {
                  if (e === 'conflict_email') {
                      alert('Email already exists.');
                  } else {
                    // handle other errors
                  }
              }
          });
        }
    }

}
