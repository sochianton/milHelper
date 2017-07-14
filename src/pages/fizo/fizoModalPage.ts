import { Component} from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { IConfigData} from './fizo';



@Component({
  templateUrl: 'modal.html',
})
export class FizoModalPage {

  config: IConfigData;

  title:string = 'Настройки';

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
  ){
    let data = params.get('config');
    this.config = {
      gender: data.gender,
      vozrast: data.vozrast,
      ves: data.ves
    };

  }

  dismiss() {
    let data = this.config;
    this.viewCtrl.dismiss(data);
  }

}
