import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FizoPage } from './fizo';


@NgModule({
  declarations: [
    FizoPage
  ],
  imports: [
    IonicPageModule.forChild(FizoPage),
  ],
  exports: [
    FizoPage
  ]
})
export class FizoPageModule {}
