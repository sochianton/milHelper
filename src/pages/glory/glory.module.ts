import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GloryPage } from './glory';
import { GloryDetails } from './gloryDetails';

@NgModule({
  declarations: [
    GloryPage,
    GloryDetails
  ],
  imports: [
    IonicPageModule.forChild(GloryPage),
  ],
  exports: [
    GloryPage,
    GloryDetails
  ],
  entryComponents:[
  	GloryDetails
  ]
})
export class GloryPageModule {}
