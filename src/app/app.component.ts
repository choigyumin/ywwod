import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Auth } from '@ionic/cloud-angular';

import { Submit } from '../pages/submit/submit';
import { Statistics } from '../pages/statistics/statistics';
import { Info } from '../pages/info/info';
import { Settings } from '../pages/settings/settings';
import { AuthPage } from '../pages/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AuthPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public events: Events, public auth: Auth) {
    this.initializeApp();

    
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'WOD submit', component: Submit },
      { title: 'Statistics', component: Statistics },
      { title: '회원정보', component: Info },
      { title: '설 정', component: Settings }
    ];

    

  }
   

  onPageDidEnter() {
      this.events.subscribe('user:logged_in', () => { 
        console.log("This works");
        this.nav.setRoot(Submit);
      });
      if (this.auth.isAuthenticated() === false) {
        // User is not authenticated, proceed to auth page.
        this.nav.setRoot(AuthPage);
      } else {
        // User is authenticated, proceed to main screen.
        this.nav.setRoot(Submit);
      }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
      
    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
