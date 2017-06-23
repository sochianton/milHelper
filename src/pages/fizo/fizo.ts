import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

export class Storage {

  data : any = {

    man:[

      {
        title: 'sila'
      },
      {
        title: 'speed'
      },
      {
        title: 'stamina'
      }
    ]

  };

}

@IonicPage()
@Component({
  selector: 'page-fizo',
  templateUrl: 'fp.html',
})
export class FizoPage {

  data : any;
  title: string = 'Калькулятор ФП';


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.data = new Storage().data;
  }

  myAlert(s:string){
    let toast = this.toastCtrl.create({
      message: s,
      duration: 3000
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FizoPage');
  }


}
