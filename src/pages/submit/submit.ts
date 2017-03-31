import { Component } from '@angular/core';

import { Nav, NavController, AlertController, ToastController, Events } from 'ionic-angular';
import { FormControl } from '@angular/forms';

import { User,Auth } from '@ionic/cloud-angular';
import { Statistics } from '../statistics/statistics';
<<<<<<< HEAD
import { WodProvider } from '../../providers/wod-provider'
import 'rxjs/add/operator/debounceTime';
=======
import {AngularFire, FirebaseListObservable} from 'angularfire2';
>>>>>>> choigyumin/master

@Component({
  selector: 'page-submit',
  templateUrl: 'submit.html'
})
export class Submit {
  boxArray = this.user.get('box', []);
  wodArray = this.user.get('wod', []);
  recordArray = this.user.get('record',[]);
  memoArray = this.user.get('memo',[]);
  dateArray = this.user.get('date',[]);
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
<<<<<<< HEAD
  
  //필터 서치바 부분
  searchTerm: string = '';
  searchControl: FormControl
  items: any;
  searching: any = false;

  constructor(public nav:Nav, public navCtrl: NavController, private alertCtrl: AlertController, public toastCtrl: ToastController, public events:Events, public db:Database, public user:User, public auth:Auth, public dataService: WodProvider) {
      this.db.connect();
      this.searchControl = new FormControl();
=======
  public wods: FirebaseListObservable<any>;
  constructor(public nav:Nav, public navCtrl: NavController, private alertCtrl: AlertController, public toastCtrl: ToastController, public events:Events, public user:User, public auth:Auth, public af: AngularFire) {
      this.wods = af.database.list('/wods');
>>>>>>> choigyumin/master
  }

  doSubmit(form) {
      if (form.valid) {
          this.boxArray.push(this.submit.box);
          this.wodArray.push(this.submit.wod);
          this.recordArray.push(this.submit.record);
          this.memoArray.push(this.submit.memo);
          this.dateArray.push(this.submit.date);
          this.user.set('box', this.boxArray);
          this.user.set('wod', this.wodArray);
          this.user.set('record', this.recordArray);
          this.user.set('memo', this.memoArray);
          this.user.set('date', this.dateArray);
          this.user.save();
          //using user's custom data
          //instead of database
          /*
          this.db.collection("users").upsert({
              id:this.user.id,
              WOD:this.submit
          });
          */
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

  //필터 서치바 메서드
  ionViewDidLoad() {
 
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(400).subscribe(search => {
    this.searching = false;
    this.setFilteredItems();
      
    });
  }
 
  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {

    this.items = this.dataService.filterItems(this.searchTerm);

  }
}
