import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { INormativeCard, DataProvider, ITitles} from  '../../../providers/data/data';
import { IConfigData} from  '../fizo';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'normativ',
  templateUrl: 'normativ.html'
})
export class NormativComponent implements OnInit{

  titles: Observable<Array<ITitles>> = null;

  @Output() onBalChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() config: IConfigData;

  uprNum: number;
  result: number;
  resInBal: number = 0;

  card: INormativeCard = null;

  constructor(private data: DataProvider) {}

  ngOnInit(){
    this.setDefault();
  }

  setDefault(){
    this.clearCard();
  }

  clearCard(){
    this.uprNum = null;
    this.result = null;
    this.card = null;
    this.resInBal = 0;
  }

  setTitles(){
    this.titles = this.data.getTitles(this.config.gender);
  }

  setConf(data:IConfigData){
    this.config = JSON.parse(JSON.stringify(data));
    this.setTitles();
    this.calcManage(false);
  }

   /**
  *  Обработчик события изменения номера упражнения
  */
  onCardChanged(){

    if(typeof this.uprNum === "undefined" || this.uprNum == null){
      console.log('Переменная uprNum не определена');
      return;
    }
    else{
      let cards: INormativeCard[] = [];
      let card : INormativeCard = null;

      this.data.getCards(this.config.gender).subscribe(

        (res)=>{

          for(let i in res){
            cards.push(res[i])
          }

          for (let i in cards){
            let curCard = cards[i];
            if(curCard.uprN == this.uprNum){
              card = curCard;
              break;
            }
          }

        },
        (err)=>{},
        ()=>{
          let tmpCard = this.card;
          this.card = card ? card : this.card;
          if(tmpCard != this.card){
            this.calcManage();
          }
        }

      );
    }

  }

  /**
  *  Обработчик события изменения результатов упражнения
  */
  onResultChanged(){

    if(typeof this.result === "undefined" || this.result == 0 || this.result == null)
      console.log('Переменная result не определена или равна 0');

    this.calcManage();

  }

  /**
  *  Запускает подсчет результата и генерирует событие изменения
  */
  calcManage(emit:boolean = true): void{
    let tmpRes = this.resInBal;
    this.resCalculate();
    if(emit && this.resInBal != tmpRes){
      this.onBalChange.emit(this.resInBal);
    }
  }  

  /**
  *  Простой подсчет Баллов
  */
  resCalculate(): void {

    let tmplRes:number = 0;

    if( 
        typeof this.result === "undefined" ||
        this.result == 0 ||
        this.result == null ||
        typeof this.uprNum === "undefined" ||
        this.uprNum == null
      )
    {
       this.resInBal = tmplRes;
       return;
    }
    else
    {
        // Таблица. Деление результата по параметрам
        if(this.card == null){
          console.log('Переменная card не определена');
          this.resInBal = tmplRes;
          return;
        }

        let tabl = this.card.results;

        if(typeof tabl['mod'] !== "undefined"){
          let tmpTabl: any;
          let mod = 'vozrast';
          for (let k in tabl){
            if(k == 'mod'){
              mod = tabl[k];
              continue;
            }
            if(typeof tmpTabl === "undefined") tmpTabl = tabl[k];
            if(mod == 'vozrast'){
              if(this.config.vozrast >= parseInt(k)){
                tmpTabl = tabl[k];
              }
            }
            if(mod == 'ves'){
              if(this.config.ves >= parseInt(k)){
                tmpTabl = tabl[k];
              }
            }

          }
          tabl = tmpTabl;
        }

        // В какую сторону сравнивать
        let mod:number = 1;
        let first: number;

        for (let ind in tabl){
          let val = parseFloat(tabl[ind]);
          if(typeof first === "undefined"){
            first = val;
            continue;
          }
          else{
            if(first > val) mod = -1;
            break;
          }
        }

        console.log(tabl);

        // Непосредственное нахождение результата
        for(let key in tabl){
          let val = parseFloat(tabl[key]); //15
          if(this.result >= val && mod == 1){
            tmplRes = parseInt(key);
            continue;
          }
          if(this.result <= val && mod == -1){
            tmplRes = parseInt(key);
            continue;
          }
          break;
        }

        this.resInBal = tmplRes;

      }      
  }


}
