import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User, Database } from '@ionic/cloud-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class UserProvider {

  constructor(
      public http: Http,
      public user: User,
      public db: Database
  ) {
    this.db.connect();
  }

  initialSyncUser() {        
    this.db.collection('userSearch').update({ id: this.user.id, name: this.user.details.name, sharedLists: [] });
  }

  changeName(name) {
    this.user.details.name = name;
    this.user.save();    
  }

}