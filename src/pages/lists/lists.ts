import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '@ionic/cloud-angular';
import { Lists } from '../../providers/lists';


@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: Database, public lists: Lists) {}

  ionViewDidLoad() {
    if (this.db.onConnected()) {
        this.lists.getLists();
    };   
  }
  ngOnDestroy() {
        this.lists.unsubLists();
  }
}
