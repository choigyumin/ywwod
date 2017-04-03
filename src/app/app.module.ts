//import { NgModule, ErrorHandler } from '@angular/core';
//import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { Submit } from '../pages/submit/submit';
import { Statistics } from '../pages/statistics/statistics';
import { Info } from '../pages/info/info';
import { Settings } from '../pages/settings/settings';
import { FabToolbar } from '../pages/fab-toolbar/fab-toolbar';
import { AuthPage } from '../pages/auth/auth';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';

import { WodProvider } from '../providers/wod-provider';

import { WodlistPage } from '../pages/wodlist/wodlist';


import { AngularFireModule } from 'angularfire2';
//Before import, two commands should be installed
// npm install @ionic/app-scripts@latest --save-dev
// npm install firebase --save
// npm install angularfire2 --save

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAm1gpnn30s9JKCxnqNuoyA0sBdEWdY1bo",
  authDomain: "ywwod-cccb6.firebaseapp.com",
  databaseURL: "https://ywwod-cccb6.firebaseio.com",
  storageBucket: "ywwod-cccb6.appspot.com",
  messagingSenderId: "494192261395"
};

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '64cb5d39'
  },
  'database': {
    'authType': 'authenticated'
  }
};
@NgModule({
  declarations: [
    MyApp,
    Submit,
    Statistics,
    Info,
    Settings,
    FabToolbar,
    AuthPage,
    SignupPage,
    LoginPage,
    WodlistPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Submit,
    Statistics,
    Info,
    Settings,
    FabToolbar,
    AuthPage,
    SignupPage,
    LoginPage,
    WodlistPage
  ],
  
  //providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
  providers: [WodProvider]
})
export class AppModule {}
