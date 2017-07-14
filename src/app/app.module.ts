import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule }   from '@angular/forms';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FizoPage} from '../pages/fizo/fizo';
import { FizoModalPage} from '../pages/fizo/fizoModalPage';
import { DataProvider } from '../providers/data/data';
import { NormativComponent } from '../pages/fizo/normativ/normativ';

import { GloryPage} from '../pages/glory/glory';
import { GloryDetails} from '../pages/glory/gloryDetails';

import { HttpModule }   from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    FizoPage,
    NormativComponent,
    FizoModalPage,

    GloryPage,
    GloryDetails,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    FizoPage,
    NormativComponent,
    FizoModalPage,

    GloryPage,
    GloryDetails
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
  ]
})
export class AppModule {}
