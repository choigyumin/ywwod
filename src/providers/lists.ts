import { Injectable } from '@angular/core';
import { Database } from '@ionic/cloud-angular';
import {Auth, User} from '@ionic/cloud-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class Lists {

    // list data
    public lists: Array<any>;
    public sharedLists: Array<any>;

    // sub/unsub
    public mine: any;
    public shared: any;

    // selected list
    public list: any;    
    private queryTemplate: any;    

    constructor(private db: Database, private auth: Auth, private user: User) {
        this.db = db;
        this.auth = auth;
        this.user = user;
        this.lists = [];        

        this.queryTemplate = this.db.model( () => {
            return {
                lists: this.db.collection('lists').findAll({'creator': this.user.id}),                
            }
        });
    }


    getLists() {
        this.mine = this.queryTemplate().watch().subscribe((data) => {
            this.lists = data.lists;
        });
        this.shared = this.db.collection('userSearch').find({ id: this.user.id }).watch().subscribe( (currentUser) => {
          let tempShared = [];
          currentUser.sharedLists.forEach( (listIter) => {
            this.db.collection('lists').find(listIter.id).fetch().subscribe( (list) => {
              tempShared.push(list);
              this.sharedLists = tempShared;
            })
          })
        });
    }

    addList(newList) {
        this.db.collection('lists').store(newList);
    }

    removeList(list) {
        this.db.collection('lists').remove(list.id);
    }

    unsubLists() {
        this.mine.unsubscribe();
        this.shared.unsubscribe();
    }
}