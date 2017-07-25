import { Component, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type, OnInit, OnDestroy} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { DataProvider} from  '../../providers/data/data';
import { NormativComponent } from './normativ/normativ';
import { FizoModalPage } from './fizoModalPage';



export class CardItem {
  constructor(public component: Type<any>, public data: any) {}
}

export interface IConfigData {
  gender:string;
  vozrast:number;
  ves:number;
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

  private _defConf: IConfigData = {
    gender: 'm',
    vozrast: 30,
    ves: 80
  };

  config: IConfigData = this._defConf;

  totalResult:number=0;

  @ViewChild('cardsTarget', {read: ViewContainerRef})
  cardsCon: ViewContainerRef;

  cardsCompon: Array<ComponentRef<NormativComponent>> =[];

  // ---------------------------------------------


  constructor(public navCtrl: NavController, public navParams: NavParams,private resolver: ComponentFactoryResolver, public toastCtrl: ToastController, private data: DataProvider, public modal: ModalController) {}

  myAlert(s:string){
    let toast = this.toastCtrl.create({
      message: s,
      duration: 3000
    });
    toast.present();
  }

  ngOnDestroy(){}

  ngOnInit(){
    this.setToDefault();
    let i = 0;
    while (i < this.minNumCards){
      this.addNormativComponent();
      i++;
    }
  }

  setToDefault(){
    if(typeof this.config.gender === "undefined") this.config.gender = this._defConf.gender;
    if(typeof this.config.vozrast === "undefined") this.config.vozrast = this._defConf.vozrast;
    if(typeof this.config.ves === "undefined") this.config.ves = this._defConf.ves;
  }

  addNormativComponent(){
    let componentFactory = this.resolver.resolveComponentFactory((new CardItem(NormativComponent, {})).component);
    let componentRef = this.cardsCon.createComponent(componentFactory);
    this.cardsCompon.push(componentRef);
    (<NormativComponent>componentRef.instance).setConf(this.config);
    (<NormativComponent>componentRef.instance).onBalChange.subscribe(
      res=>{
        this.calculateTotalBall();
      }
    );
  }

  removeNormativComponent(i:number){
    this.cardsCompon[i].destroy();
    this.cardsCompon.splice(i,1);
  }

  addCard(){
    if (this.cardsCon.length >= this.maxNumCards){
      this.myAlert(this.maxErrMsg);
      return ;
    }
    this.addNormativComponent();
    this.calculateTotalBall();
  }

  removeCard(){
    if (this.cardsCon.length <= this.minNumCards){
      this.myAlert(this.minErrMsg);
      return ;
    }
    this.removeNormativComponent(this.cardsCon.length-1);
    this.calculateTotalBall();
  }

  calculateTotalBall(){
    this.totalResult=0;
    for(let i in this.cardsCompon){
      let card = this.cardsCompon[i];
      this.totalResult += card.instance.resInBal;
    }
  }

  refreshCardsConf(){
    for(let i in this.cardsCompon){
      let card = this.cardsCompon[i];
      card.instance.setConf(this.config);
    }
  }

  clearCards(){
    for(let i in this.cardsCompon){
      let card = this.cardsCompon[i];
      card.instance.setDefault();
    }
  }

  showModal() {

    let modal = this.modal.create(FizoModalPage, {config: this.config});
    modal.onDidDismiss( (config: IConfigData)=>{

      let olds = this.config;
      this.config = config;
      this.setToDefault();
      this.refreshCardsConf();

      if(olds.gender != config.gender){
        this.clearCards();
      }

      this.calculateTotalBall();
    });
    modal.present();
  }

}
