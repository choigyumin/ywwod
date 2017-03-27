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
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
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
    LoginPage
  ],
  
  //providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
  providers: [WodProvider]
})
export class AppModule {}
