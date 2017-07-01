import { Component, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type, OnInit, OnDestroy} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { INormativeCard, DataProvider} from  '../../providers/data/data';
import { NormativComponent } from './normativ/normativ';



export class CardItem {
  constructor(public component: Type<any>, public data: any) {}
}


@IonicPage()
@Component({
  selector: 'page-fizo',
  templateUrl: 'fp.html',
})
export class FizoPage implements OnInit, OnDestroy{

  minNumCards:number = 3;
  maxNumCards: number = 5;
  maxErrMsg :string = `Количество упражнений не может быть больше ${ this.maxNumCards }`;
  minErrMsg :string = `Количество упражнений не может быть меньше ${ this.minNumCards }`;
  title: string = 'Калькулятор ФП';

  @ViewChild('cardsTarget', {read: ViewContainerRef})
  cardsCon: ViewContainerRef;

  //cardsCompon: ComponentRef[];

  // ---------------------------------------------


  constructor(public navCtrl: NavController, public navParams: NavParams,private resolver: ComponentFactoryResolver, public toastCtrl: ToastController, private data: DataProvider) {}

  myAlert(s:string){
    let toast = this.toastCtrl.create({
      message: s,
      duration: 3000
    });
    toast.present();
  }

  ngOnDestroy(){}

  ngOnInit(){
    let i = 0;
    while (i < this.minNumCards){
      this.addNormativComponent();
      i++;
    }

  }

  addNormativComponent(){
    let componentFactory = this.resolver.resolveComponentFactory((new CardItem(NormativComponent, {})).component);
    let componentRef = this.cardsCon.createComponent(componentFactory);
  }


  addCard(){
    if (this.cardsCon.length >= this.maxNumCards){
      this.myAlert(this.maxErrMsg);
      return ;
    }
    this.addNormativComponent();
  }

  removeCard(){
    if (this.cardsCon.length <= this.minNumCards){
      this.myAlert(this.minErrMsg);
      return ;
    }
    this.cardsCon.remove();
  }

}
