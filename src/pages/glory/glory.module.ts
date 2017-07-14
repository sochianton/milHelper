import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GloryPage } from './glory';

@NgModule({
  declarations: [
    GloryPage,
  ],
  imports: [
    IonicPageModule.forChild(GloryPage),
  ],
  exports: [
    GloryPage
  ]
})
export class GloryPageModule {}
