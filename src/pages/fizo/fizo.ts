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

  vozrast:number = 30;
  ves:number = 73;
  totalResult:number=0;

  @ViewChild('cardsTarget', {read: ViewContainerRef})
  cardsCon: ViewContainerRef;

  cardsCompon: Array<ComponentRef<NormativComponent>> =[];

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
    this.cardsCompon.push(componentRef);
    (<NormativComponent>componentRef.instance).vozrast = this.vozrast;
    (<NormativComponent>componentRef.instance).ves = this.ves;
    (<NormativComponent>componentRef.instance).onBalChange.subscribe(
      res=>{
        this.calculateResults();
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
    this.calculateResults();
  }

  removeCard(){
    if (this.cardsCon.length <= this.minNumCards){
      this.myAlert(this.minErrMsg);
      return ;
    }
    this.removeNormativComponent(this.cardsCon.length-1);
    this.calculateResults();
  }

  calculateResults(){
    this.totalResult=0;
    for(let i in this.cardsCompon){
      let card = this.cardsCompon[i];
      this.totalResult += card.instance.resInBal;
    }
  }

}
