import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { User,Auth } from '@ionic/cloud-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
/*
  Generated class for the Wodlist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wodlist',
  templateUrl: 'wodlist.html'
})
export class WodlistPage {
  public wods: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public user: User, public af: AngularFire, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
      this.wods = af.database.list('/wods');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WodlistPage');
  }
    
  addWod() {
    let prompt = this.alertCtrl.create({
    title: 'WOD Name',
    message: "Enter a name for this new WOD",
    inputs: [
      {
        name: 'title',
        placeholder: 'Title'
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
          this.wods.push({
            title: data.title
          });
        }
      }
    ]
  });
  prompt.present();
  }

  showOptions(wodId, wodTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete WOD',
          role: 'destructive',
          handler: () => {
            this.removeWod(wodId);
          }
        },{
          text: 'Update title',
          handler: () => {
            this.updateWod(wodId, wodTitle);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  updateWod(wodId, wodTitle){
    let prompt = this.alertCtrl.create({
      title: 'WOD Name',
      message: "Update the name for this WOD",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: wodTitle
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
            this.wods.update(wodId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }
  removeWod(wodId: string){
    this.wods.remove(wodId);
  }
}
