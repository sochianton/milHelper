import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FizoPage } from './fizo';
import { FizoModalPage} from './fizoModalPage';
import { NormativComponent } from './normativ/normativ';


@NgModule({
  declarations: [
    FizoPage,
    FizoModalPage,
    NormativComponent
  ],
  imports: [
    IonicPageModule.forChild(FizoPage),
  ],
  exports: [
    FizoPage,
    FizoModalPage,
    NormativComponent
  ],
  entryComponents:[
  	FizoModalPage,
  	NormativComponent
  ]
})
export class FizoPageModule {}
