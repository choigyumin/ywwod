import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { Submit } from '../pages/submit/submit';
import { Statistics } from '../pages/statistics/statistics';
import { Info } from '../pages/info/info';
import { Settings } from '../pages/settings/settings';
import { FabToolbar } from '../pages/fab-toolbar/fab-toolbar';


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
    FabToolbar
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
    FabToolbar
  ],
  
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
