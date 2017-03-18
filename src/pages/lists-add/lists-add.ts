import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Lists } from '../../providers/lists';
import { Auth, User } from '@ionic/cloud-angular';


@Component({
  selector: 'page-lists-add',
  templateUrl: 'lists-add.html'
})
export class ListsAddPage {

  public name : 'Gyumin Choi';
  public description : 'JJANG';
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public listProvider: Lists, public auth: Auth, public user: User) {
      this.listProvider.addList({
        name: this.name,
        description: this.description,
        creator: this.user.id,
        sharedWith: []
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListsAddPage');
  }


}
